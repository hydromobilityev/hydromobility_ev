<?php

namespace App\Admin\Controllers;

use App\CorporateCustomer;
use App\Models\Policy;
use App\Status;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class PolicyController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Policies';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new Policy);


        $grid->column('id', __('Id'));
        $grid->column('corporate_customer_id', __('Corporate Customer'))->display(function ($corporate_customer) {
            return CorporateCustomer::where('id', $corporate_customer)->value('first_name') ?: '-';
        });
        $grid->column('title', __('Title'));
        $grid->column('short_description', __('Short Description'));
        $grid->column('long_description', __('Long Description'));
        $grid->column('status', __('Status'))->display(function ($status) {
            $status_name = Status::where('id', $status)->value('name');
            if ($status == 1) {
                return "<span class='label label-success'>$status_name</span>";
            } else {
                return "<span class='label label-danger'>$status_name</span>";
            }
        });
        $grid->disableExport();

        if (env('APP_MODE') == 'DEMO') {
            $grid->disableActions();
        } else {
            $grid->actions(function ($actions) {
                $actions->disableView();
            });
        }


        $grid->filter(function ($filter) {
            $statuses = Status::where('type', 'general')->pluck('name', 'id');

            $filter->like('title', 'Title');
            $filter->equal('status', 'Status')->select($statuses);
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
        $form = new Form(new Policy);

        $corporate_customers = CorporateCustomer::pluck('first_name', 'id');
        $statuses = Status::where('type', 'general')->pluck('name', 'id');

        $form->select('corporate_customer_id', 'Corporate Customer')->options($corporate_customers)->rules('required');
        $form->text('title', __('Title'));
        $form->textarea('short_description', __('Short Description'));
        $form->textarea('long_description', __('Long Description'));
        $form->text('title_ar', __('Title Ar'));
        $form->textarea('short_description_ar', __('Short Description Ar'));
        $form->textarea('long_description_ar', __('Long Description Ar'));
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
