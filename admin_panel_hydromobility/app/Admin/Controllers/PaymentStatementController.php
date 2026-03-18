<?php

namespace App\Admin\Controllers;

use App\Models\TripRequest;
use App\Models\PaymentStatement;
use App\CorporateCustomer;
use App\Models\CorporateAgent;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Grid;
use Encore\Admin\Form;

class PaymentStatementController extends AdminController
{
    protected $title = 'Payment Statements';

    protected function grid()
    {
        $grid = new Grid(new PaymentStatement());
        $grid->column('id', __('Id'));
        $grid->column('corporate_customer_id', __('Corporate Customer'))->display(function ($corporate_customer) {
            return CorporateCustomer::where('id', $corporate_customer)->value('first_name') ?: '-';
        });
        $grid->column('payment_period', __('Payment Period'))->display(function ($period) {
            if ($period) {
                $start = \Carbon\Carbon::parse($period)->startOfMonth()->format('M j');
                $end = \Carbon\Carbon::parse($period)->endOfMonth()->format('M j, Y');
                return "{$start} - {$end}";
            }
            return '-';
        });

        $grid->column('total', __('Total'));
        $grid->column('sub_total', __('Sub Total'));
        $grid->column('tax', __('Tax'));
        $grid->column('service_fee', __('Service Fee'));
        $grid->column('status', __('Status'))->display(function ($status) {
            if ($status == 0) {
                return "<span class='label label-warning'>Initiated</span>";
            }
            if ($status == 1) {
                return "<span class='label label-info'>Processing</span>";
            } else {
                return "<span class='label label-success'>Approved</span>";
            }
        });
        $grid->filter(function ($filter) {
            $corporate_customer = CorporateCustomer::pluck('first_name', 'id');
            $filter->equal('corporate_customer_id', 'Corporate Customer')->select($corporate_customer);
        });

        $grid->disableCreateButton();
        $grid->disableActions();

        return $grid;
    }

    protected function form()
    {
        $form = new Form(new PaymentStatement());

        $form->disableCreatingCheck();
        $form->disableEditingCheck();
        $form->disableViewCheck();
        $form->tools(function ($tools) {
            $tools->disableDelete();
            $tools->disableView();
        });

        return $form;
    }
}
