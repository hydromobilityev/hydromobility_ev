<?php

namespace App\Admin\Controllers;

use App\CorporateCustomerRequest;
use App\Status;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Admin;

class CorporateCustomerRequestController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Corporate Customer Requests';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new CorporateCustomerRequest);
        $grid->column('id', __('Id'));
        $grid->column('first_name', __('First Name'));
        $grid->column('last_name', __('Last Name'));
        $grid->column('phone_number', __('Phone number'));
        $grid->column('phone_with_code', __('Phone With Code'));
        $grid->column('company_email', __('Company Email'));
        $grid->column('address', __('Address/Location'));
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

        $grid->disableCreateButton();
        $grid->actions(function ($actions) {
            $actions->disableView();
            // $actions->disableDelete();

        });

        $grid->filter(function ($filter) {

            $filter->disableIdFilter();
            $filter->like('first_name', 'First Name');
            $filter->like('last_name', 'Last Name');
            $filter->like('phone_number', 'Phone number');
            $filter->like('phone_with_code', 'Phone With Code');
            $filter->like('company_email', 'Company Email');
            $filter->equal('status', __('Status'))->select([
                0 => 'Initiated',
                1 => 'Processing',
                2 => 'Approved',
            ]);
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
        $form = new Form(new CorporateCustomerRequest);

        $form->text('first_name', __('First name'))->rules('required');
        $form->text('last_name', __('Last name'))->rules('required');
        $form->text('phone_number', __('Phone number'))->rules('required');
        $form->text('phone_with_code', __('Phone With Code'))->rules('required');
        $form->text('company_name', __('Company Name'))->rules('required');
        $form->email('company_email', __('Company Email'))->rules('required');
        $form->text('designation', __('Designation'))->rules('required');
        $form->textarea('address', __('Address/Location'))->rules('required');
        $form->select('status', __('Status'))->options([
            0 => 'Initiated',
            1 => 'Processing',
            2 => 'Approved',
        ])->rules('required');

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
