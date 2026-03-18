<?php

namespace App\Admin\Controllers;

use App\CorporateCustomer;
use App\Status;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Admin;

class CorporateCustomerController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Corporate Customers';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new CorporateCustomer);
        $grid->column('id', __('Id'));
        $grid->column('first_name', __('First Name'));
        $grid->column('last_name', __('Last Name'));
        $grid->column('phone_number', __('Phone number'));
        $grid->column('phone_with_code', __('Phone With Code'));
        $grid->column('email', __('Email'));
        $grid->column('username', __('User Name'));
        $grid->column('address', __('Address/Location'));
        $grid->column('parent_id', __('Parent'))->display(function ($parent_id) {
            if (empty($parent_id) || $parent_id == 0) {
                return "<span class='label label-primary'>Admin</span>";
            }
            $parent = CorporateCustomer::find($parent_id);
            return $parent ? $parent->first_name . ' ' . $parent->last_name : $parent_id;
        });
        $grid->column('status', __('Status'))->display(function ($status) {
            $status_name = Status::where('id', $status)->value('name');
            if ($status == 1) {
                return "<span class='label label-success'>$status_name</span>";
            } else {
                return "<span class='label label-danger'>$status_name</span>";
            }
        });

        $grid->disableExport();
        $grid->actions(function ($actions) {
            $actions->disableView();
            // $actions->disableDelete();
        });

        $grid->filter(function ($filter) {
            $statuses = Status::where('type', 'general')->pluck('name', 'id');

            $filter->disableIdFilter();
            $filter->like('first_name', 'First Name');
            $filter->like('last_name', 'Last Name');
            $filter->like('username', 'User Name');
            $filter->like('phone_number', 'Phone number');
            $filter->like('phone_with_code', 'Phone With Code');
            $filter->like('email', 'Email');
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
        $form = new Form(new CorporateCustomer);
        $statuses = Status::where('type', 'general')->pluck('name', 'id');

        $form->text('first_name', __('First name'))->rules('required');
        $form->text('last_name', __('Last name'))->rules('required');
        $form->text('phone_number', __('Phone number'))->rules('required');
        $form->text('phone_with_code', __('Phone With Code'))->rules('required');
        $form->email('email', __('Email'))->rules('required');
        $form->text('username', __('User name'))->rules('required');
        $form->password('password', __('Password'))->rules('required');
        $form->image('profile_picture', __('Profile picture'))->move('corporate_customers/')->uniqueName()->rules('required');
        $form->text('company_name', __('Company Name'))->rules('required');
        $form->text('registration_number', __('Registration Number'));
        $form->text('vat_number', __('VAT Number'))->default(0);
        $form->text('designation', __('Designation'))->rules('required');
        $form->textarea('address', __('Address/Location'))->rules('required');
        $form->select('status', 'Status')->options($statuses)->rules('required');

        $form->saving(function ($form) {
            if ($form->password && $form->model()->password != $form->password) {
                $form->password = $this->getEncryptedPassword($form->password);
            }

            if (empty($form->model()->parent_id)) {
                $form->parent_id = 0;
            }
        });
        $form->tools(function (Form\Tools $tools) {
            // $tools->disableDelete();
            $tools->disableView();
        });
        $form->footer(function ($footer) {
            $footer->disableViewCheck();
            $footer->disableEditingCheck();
            $footer->disableCreatingCheck();
        });

        return $form;
    }

    public function getEncryptedPassword($input, $rounds = 12)
    {
        $salt = "";
        $saltchars = array_merge(range('A', 'Z'), range('a', 'z'), range(0, 9));
        for ($i = 0; $i < 22; $i++) {
            $salt .= $saltchars[array_rand($saltchars)];
        }
        return crypt($input, sprintf('$2y$%2d$', $rounds) . $salt);
    }
}
