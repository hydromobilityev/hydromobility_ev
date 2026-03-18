<?php

namespace App\Admin\Controllers;

use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use App\Models\WebsiteSetting;
class WebsiteSettingController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Website Setting';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new WebsiteSetting);

        $grid->disableCreation();
        $grid->column('id', __('ID'))->sortable();
        $grid->column('title', __('Title'));
        $grid->column('description', __('Description'));
        $grid->column('banner_image', __('Banner Image'))->image();
        $grid->column('playstore_link', __('Playstore Link'));
        $grid->column('appstore_link', __('Appstore Link'));
        $grid->column('store_image', __('Store Image'))->image();
        $grid->column('store_title', __('Store Title'));
        $grid->column('store_description', __('Store Description'));
        $grid->column('contact_link', __('Contact Link'));
        $grid->column('website_color', __('Website Color'));
        $grid->column('facebook_link', __('Facebook Link'));
        $grid->column('twitter_link', __('Twitter Link'));
        $grid->column('linkedin_link', __('Linkedin Link'));
        $grid->column('skype_link', __('Skype Link'));

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
        $form = new Form(new WebsiteSetting);

        $form->text('title', __('Title'))->rules(function ($form) {
            return 'required|max:250';
        });
        $form->textarea('description', __('Description'))->rules(function ($form) {
            return 'required';
        });
        $form->image('banner_image', __('Banner Image'))->uniqueName()->move('banner_image')->rules('required');

        $form->text('playstore_link', __('Playstore Link'))->rules(function ($form) {
            return 'required|max:250';
        });
        $form->text('appstore_link', __('Appstore Link'))->rules(function ($form) {
            return 'required|max:250';
        });
        $form->image('store_image', __('Store Image'))->uniqueName()->move('store_image')->rules('required');

        $form->text('store_title', __('Store Title'))->rules(function ($form) {
            return 'required|max:250';
        });
        $form->textarea('store_description', __('Store Description'))->rules(function ($form) {
            return 'required';
        });
        $form->text('contact_link', __('Contact Link'))->rules(function ($form) {
            return 'required|max:250';   
        });
        $form->text('website_color', __('Website Color'))->rules(function ($form) {
            return 'required|max:250';   
        });
        $form->text('facebook_link', __('Facebook Link'))->rules(function ($form) {
            return 'required|max:250';   
        });
        $form->text('twitter_link', __('Twitter Link'))->rules(function ($form) {
            return 'required|max:250';   
        });
        $form->text('linkedin_link', __('Linkedin Link'))->rules(function ($form) {
            return 'required|max:250';   
        });
        $form->text('skype_link', __('Skype Link'))->rules(function ($form) {
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
