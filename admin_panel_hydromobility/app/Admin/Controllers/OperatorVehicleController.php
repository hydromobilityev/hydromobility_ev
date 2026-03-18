<?php

namespace App\Admin\Controllers;

use App\Models\OperatorVehicle;
use App\Models\Operator;
use App\VehicleCategory;
use App\DriverVehicle;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class OperatorVehicleController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Operator Vehicles';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new OperatorVehicle());

        $grid->column('id', __('Id'));
        $grid->column('operator_id', __('Operator Name'))->display(function($operator_id){
            return Operator::where('id',$operator_id)->value('operator_name');   
          });
        $grid->column('vehicle_id', __('Vehicle'))->display(function($vehicle_id){
            return DriverVehicle::where('id',$vehicle_id)->value('vehicle_number');   
          });
        
            $grid->actions(function ($actions) {
                $actions->disableView();
                
            });
       
        $grid->filter(function($filter){

            $operator_id = Operator::where('status',1)->pluck('operator_name','id');
            $vehicle_id = DriverVehicle::where('status',1)->pluck('vehicle_number','id');

            $filter->disableIdfilter();
            $filter->equal('operator_id', __('Operator Name'))->select($operator_id);
            $filter->equal('vehicle_id', __('Vehicle'))->select($vehicle_id); 
        });

        return $grid;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new OperatorVehicle());

        $operator_id = Operator::pluck('operator_name', 'id');
        $vehicle_id = DriverVehicle::pluck('vehicle_number', 'id');

        $form->select('operator_id', __('Operator Name'))->options($operator_id)->rules('required');
        $form->select('vehicle_id', __('Vehicle'))->options($vehicle_id)->rules('required');

        $form->tools(function (Form\Tools $tools) {
            $tools->disableDelete(); 
            $tools->disableView();
        });
           $form->footer(function ($footer) {
            $footer->disableViewCheck();
            $footer->disableEditingCheck();
            $footer->disableCreatingCheck();
        });

        return $form;
    }
}
