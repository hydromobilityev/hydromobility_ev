<?php

namespace App\Admin\Controllers;

use App\Models\TermCondition;
use App\UserType;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class TermConditionController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Terms And Condition';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new TermCondition());

        $grid->column('id', __('Id'));
        $grid->column('user_type_id', __('User Type'))->display(function ($types) {
            $types = UserType::where('id', $types)->value('type_name');
            return "$types";
        });
        $grid->column('title', __('Title'));
        $grid->column('title_ar', __('Title Arabic'));
        $grid->column('terms', __('Terms & Conditions'));
        $grid->column('terms_ar', __('Terms & Conditions Arabic'));
        $grid->column('status', __('Status'))->display(function ($released) {
            return $released ? 'Active' : 'Inactive';
        })->label([1 => 'success', 2 => 'danger']);

        $grid->disableExport();
        $grid->disableFilter();
        $grid->actions(function ($actions) {
            $actions->disableView();
            $actions->disableDelete();
        });
        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(TermCondition::findOrFail($id));

        $show->field('id', __('Id'));
        $show->field('terms&conditions', __('Terms&conditions'));
        $show->field('status', __('Status'));
        $show->field('created_at', __('Created at'));
        $show->field('updated_at', __('Updated at'));

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new TermCondition());
        $types = UserType::pluck('type_name', 'id');

        $form->select('user_type_id', 'User Type')->options($types)->rules('required');
        $form->text('title', __('Title'));
        $form->text('title_ar', __('Title Arabic'));
        $form->textarea('terms', __('Terms & conditions'));
        $form->textarea('terms_ar', __('Terms & conditions Arabic'));

        $form->select('status', __('Status'))->options([1 => 'Active', 2 => 'Inactive']);
        $form->footer(function ($footer) {
            $footer->disableViewCheck();
            $footer->disableEditingCheck();
            $footer->disableCreatingCheck();
        });
        $form->tools(function (Form\Tools $tools) {
            $tools->disableView();
            $tools->disableDelete();
        });

        return $form;
    }
}
