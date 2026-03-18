<?php

namespace App\Admin\Controllers;

use App\Models\CorporateTutorial;
use App\Status;
use App\ComplaintCategory;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class CorporateTutorialController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Corporate Tutorials';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new CorporateTutorial);

        $grid->column('id', __('Id'));
        $grid->column('title', __('Title'));
        $grid->column('image', __('Image'))->image();
        $grid->column('short_description', __('Short Description'));
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
            $statuses = Status::where('type', 'general')->pluck('name', 'id');
            $complaint_categories = ComplaintCategory::where('status', 1)->pluck('complaint_category_name', 'id');

            $filter->disableIdFilter();
            $filter->like('complaint_category', 'Complaint category')->select($complaint_categories);
            $filter->like('complaint_sub_category_name', 'Complaint sub category');
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
        $form = new Form(new CorporateTutorial);
        $statuses = Status::where('type', 'general')->pluck('name', 'id');

        $form->text('title', __('Title'))->rules('required|max:250');
        $form->image('image', __('Image'))->uniqueName();
        $form->textarea('short_description', __('Short description'));
        $form->textarea('long_description', __('Long description'));
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
