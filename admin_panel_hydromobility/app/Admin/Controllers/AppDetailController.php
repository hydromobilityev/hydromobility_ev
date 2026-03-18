<?php

namespace App\Admin\Controllers;

use App\AppDetail;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class AppDetailController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'App Details';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new AppDetail);

        $grid->column('id', __('Id'));
        $grid->column('title', __('Title'));
        $grid->column('description', __('Description'));
        $grid->column('icon', __('Icon'))->image();
        
            $grid->actions(function ($actions) {
                $actions->disableView();
            });
        

        $grid->filter(function ($filter) {

            $filter->disableIdFilter();
            $filter->like('title', 'Title');
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
        $form = new Form(new AppDetail);
        
        $form->text('title', __('Title'))->rules('required');
        $form->textarea('description', __('Description'));
        $form->image('icon', __('Icon'))->uniqueName()->move('image')->rules('required');

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
