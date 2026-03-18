<?php

namespace App\Admin\Controllers;

use App\Models\CorporateAgent;
use App\Status;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Admin;
use App\CorporateCustomer;

class CorporateAgentController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Corporate Agents';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new CorporateAgent);
        $grid->column('id', __('Id'));
        $grid->column('corporate_customer_id', __('Corporate Customer'))->display(function ($corporate_customer) {
            return CorporateCustomer::where('id', $corporate_customer)->value('first_name') ?: '-';
        });
        $grid->column('first_name', __('First Name'));
        $grid->column('last_name', __('Last Name'));
        $grid->column('phone_number', __('Phone number'));
        $grid->column('phone_with_code', __('Phone With Code'));
        $grid->column('email', __('Email'));
        $grid->column('username', __('User Name'));
        $grid->column('address', __('Address/Location'));
        $grid->column('status', __('Status'))->display(function ($status) {
            $status_name = Status::where('id', $status)->value('name');
            if ($status == 1) {
                return "<span class='label label-success'>$status_name</span>";
            } else {
                return "<span class='label label-danger'>$status_name</span>";
            }
        });

        // $grid->disableExport();
        $grid->disableCreateButton();
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
        $form = new Form(new CorporateAgent);
        $statuses = Status::where('type', 'general')->pluck('name', 'id');
        $customers = CorporateCustomer::pluck('first_name', 'id');

        $form->select('corporate_customer_id', __('Corporate Customer'))->options($customers);
        $form->text('first_name', __('First name'))->rules('required');
        $form->text('last_name', __('Last name'))->rules('required');
        $form->text('phone_number', __('Phone number'))->rules('required');
        $form->text('phone_with_code', __('Phone With Code'))->rules('required');
        $form->email('email', __('Email'))->rules('required');
        $form->text('username', __('User name'))->rules('required');
        $form->password('password', __('Password'))->rules('required');
        $form->image('profile_picture', __('Profile picture'))->move('corporate_agents/')->uniqueName()->rules('required');
        $form->textarea('address', __('Address/Location'))->rules('required');
        $form->select('status', 'Status')->options($statuses)->rules('required');

        $form->saving(function ($form) {
            if ($form->password && $form->model()->password != $form->password) {
                $form->password = $this->getEncryptedPassword($form->password);
            }
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
