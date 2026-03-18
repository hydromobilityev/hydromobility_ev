<?php

namespace App\Admin\Controllers;

use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use App\Models\Testimonial;
class TestimonialController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Testimonials';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Testimonial);

        $grid->column('id', __('ID'))->sortable();
        $grid->column('name', __('Name'));
        $grid->column('avatar', __('Avatar'))->image();
        $grid->column('comments', __('Comments'));
        $grid->column('role', __('Role'));

        $grid->actions(function ($actions) {
            $actions->disableView();
            $actions->disableDelete();
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
        $form = new Form(new Testimonial);

        $form->text('name', __('Name'))->rules(function ($form) {
            return 'required|max:250';
        });

        $form->image('avatar', __('Avatar'))->uniqueName()->move('avatar')->rules('required');

        $form->textarea('comments', __('Comments'))->rules(function ($form) {
            return 'required';
        });

        $form->text('role', __('Role'))->rules(function ($form) {
                return 'required|max:250';
        });

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
