import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const BottomSheet = ({ children }) => {
  const sheetHeight = screenHeight - 300;
  const CLOSED_POSITION = sheetHeight - 110;
  const OPEN_POSITION = 0;

  const [isOpen, setIsOpen] = useState(false);
  const pan = useRef(new Animated.Value(CLOSED_POSITION)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const panValueRef = useRef(CLOSED_POSITION);
  const startPanRef = useRef(CLOSED_POSITION);

  useEffect(() => {
    const listenerId = pan.addListener(({ value }) => {
      panValueRef.current = value;
    });

    // Fix: use removeAllListeners to avoid "off() is not implemented" issues
    return () => {
      pan.removeAllListeners();
    };
  }, [pan]);

  const animationConfig = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    useNativeDriver: true,
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dy) > 5,

    onPanResponderGrant: () => {
      pan.stopAnimation(value => {
        startPanRef.current = value;
      });
    },

    onPanResponderMove: (_, gestureState) => {
      let newPosition = startPanRef.current + gestureState.dy;

      if (newPosition < OPEN_POSITION) {
        newPosition = OPEN_POSITION - Math.sqrt(Math.abs(OPEN_POSITION - newPosition));
      } else if (newPosition > CLOSED_POSITION) {
        newPosition = CLOSED_POSITION + Math.sqrt(Math.abs(newPosition - CLOSED_POSITION));
      }

      pan.setValue(newPosition);
      const opacityValue = 1 - (newPosition / CLOSED_POSITION);
      opacity.setValue(opacityValue);
    },

    onPanResponderRelease: (_, gestureState) => {
      const velocity = gestureState.vy;
      const currentPosition = panValueRef.current;

      let targetPosition;
      if (Math.abs(velocity) > 1.5) {
        targetPosition = velocity < 0 ? OPEN_POSITION : CLOSED_POSITION;
      } else {
        const midpoint = (OPEN_POSITION + CLOSED_POSITION) / 2;
        targetPosition = currentPosition < midpoint ? OPEN_POSITION : CLOSED_POSITION;
      }

      Animated.spring(pan, {
        toValue: targetPosition,
        ...animationConfig,
      }).start(() => {
        setIsOpen(targetPosition === OPEN_POSITION);
      });

      Animated.timing(opacity, {
        toValue: targetPosition === OPEN_POSITION ? 0.7 : 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    },
  });

  const closeSheet = () => {
    Animated.spring(pan, {
      toValue: CLOSED_POSITION,
      ...animationConfig,
    }).start(() => {
      setIsOpen(false);
    });

    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      {isOpen && (
        <TouchableWithoutFeedback onPress={closeSheet}>
          <Animated.View style={[styles.overlay, { opacity }]} />
        </TouchableWithoutFeedback>
      )}

      <Animated.View
        style={[
          styles.sheetContainer,
          {
            height: sheetHeight,
            transform: [{ translateY: pan }],
          },
        ]}
      >
        <View style={styles.handleContainer} {...panResponder.panHandlers}>
          <View style={styles.handle} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  sheetContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    overflow: 'hidden',
  },
  handleContainer: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handle: {
    height: 5,
    width: 40,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});

export default BottomSheet;