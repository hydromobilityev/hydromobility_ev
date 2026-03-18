<?php

namespace App\Admin\Controllers;

use App\Models\Operator;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class OperatorController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Operators';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Operator());

        $grid->column('id', __('Id'));
        $grid->column('operator_name', __('Operator Name'));
        $grid->column('phone_number', __('Phone Number'));
        $grid->column('phone_with_code', __('Phone With Code'));
        $grid->column('email', __('Email'));
        $grid->column('profile_picture', __('Profile Picture'))->image();
        $grid->column('status')->display(function ($status, $column) {
            If ($this->status == 1) {
                return "<span class='label label-success'>Active</span>";
            }else{
                return "<span class='label label-danger'>Inactive</span>";}
        });
        $grid->disableExport();
        // $grid->column('created_at', __('Created at'));
        // $grid->column('updated_at', __('Updated at'));
        
            $grid->actions(function ($actions) {
                $actions->disableView();
                
            });
        
        $grid->filter(function($filter){
            $statuses = [1 => 'Active',2 => 'Inactive'];
            $filter->disableIdfilter();
            $filter->like('operator_name', __('Operator Name'));
            $filter->like('phone_number', __('Phone Number'));
            $filter->equal('status', 'Status')->select($statuses);  
        });

        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    // protected function detail($id)
    // {
    //     $show = new Show(Operator::findOrFail($id));

    //     $show->field('id', __('Id'));
    //     $show->field('operator_name', __('Operator name'));
    //     $show->field('phone_number', __('Phone number'));
    //     $show->field('phone_with_code', __('Phone with code'));
    //     $show->field('email', __('Email'));
    //     $show->field('password', __('Password'));
    //     $show->field('profile_picture', __('Profile picture'));
    //     $show->field('status', __('Status'));
    //     $show->field('created_at', __('Created at'));
    //     $show->field('updated_at', __('Updated at'));

    //     return $show;
    // }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new Operator());

        $form->text('operator_name', __('Operator Name'))->rules('required');
        $form->text('phone_number', __('Phone Number'))->rules('required');
        $form->text('phone_with_code', __('Phone With Code'))->rules('required');
        $form->email('email', __('Email'))->rules('required');
        $form->image('profile_picture', __('Profile Picture'))->rules('required');
        $form->select('status', __('Status'))->options([1 => 'Active', 2 => 'InActive'])->rules('required');


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
