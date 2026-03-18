<?php

namespace App\Admin\Controllers;

use App\CorporateCustomer;
use App\Models\Group;
use App\Models\Policy;
use App\Status;
use App\UserType;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class GroupController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Groups';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Group);

        $grid->column('id', __('Id'));
        $grid->column('corporate_customer_id', __('Corporate Customer'))->display(function ($corporate_customer) {
            return CorporateCustomer::where('id', $corporate_customer)->value('first_name') ?: '-';
        });
        $grid->column('parent_id', __('Parent'))->display(function ($parent_id) {
            if (empty($parent_id) || $parent_id == 0) {
                return "<span class='label label-primary'>Admin</span>";
            }
            $parent = CorporateCustomer::find($parent_id);
            return $parent ? $parent->first_name . ' ' . $parent->last_name : $parent_id;
        });
        $grid->column('policy_id', __('Policy'))->display(function ($policy) {
            return Policy::where('id', $policy)->value('title') ?: '-';
        });
        $grid->column('group_name', __('Group Name'));
        $grid->column('group_description', __('Group Description'));
        $grid->column('status', __('Status'))->display(function ($status) {
            $status_name = Status::where('id', $status)->value('name');
            if ($status == 1) {
                return "<span class='label label-success'>$status_name</span>";
            } else {
                return "<span class='label label-danger'>$status_name</span>";
            }
        });



        $grid->actions(function ($actions) {
            $actions->disableView();
        });


        $grid->filter(function ($filter) {
            $filter->disableIdFilter();
            $filter->like('group_name', 'Group Name');
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
        $form = new Form(new Group);
        $statuses = Status::where('type', 'general')->pluck('name', 'id');
        $corporate_customers = CorporateCustomer::pluck('first_name', 'id');
        $groups = Group::pluck('group_name', 'id');

        $form->select('corporate_customer_id', __('Corporate Customer'))
            ->options($corporate_customers)
            ->load('policy_id', '/admin/get_policy_titles', 'id', 'title')
            ->rules('required');
        $form->select('policy_id', __('Policy Title'))
            ->options([])
            ->rules('required');
        $form->select('parent_id', __('Parent Group'))
            ->options([0 => 'Admin'] + $groups->toArray())
            ->default(0);
        $form->text('group_name', __('Group Name'))->rules('required|max:250');
        $form->textarea('group_description', __('Group Description'));
        $form->text('group_name_ar', __('Group Name Ar'));
        $form->textarea('group_description_ar', __('Group Description Ar'));
        $form->select('status', __('Status'))->options($statuses)->default(1)->rules('required');
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
