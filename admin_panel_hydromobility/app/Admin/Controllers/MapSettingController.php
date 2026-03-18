<?php

namespace App\Admin\Controllers;

use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use App\Models\MapSetting;

class MapSettingController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = 'Map Settings';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new MapSetting);

        $grid->column('id', __('ID'))->sortable();

        $grid->column('tiles', __('Tiles'))->using([
            1 => 'Route Mappy',
            2 => 'Google',
        ]);  
        $grid->column('routing', __('Routing'))->using([
            1 => 'Route Mappy',
            2 => 'Google',
        ]);    
        $grid->column('places', __('Places'))->using([
            1 => 'Route Mappy',
            2 => 'Google',
        ]);    
        $grid->column('geo_code', __('Geocode'))->using([
            1 => 'Route Mappy',
            2 => 'Google',
        ]);  
        $grid->column('reverse_geo_code', __('Reverse Geocode'))->using([
            1 => 'Route Mappy',
            2 => 'Google',
        ]);
        
        $grid->disableCreateButton();
        $grid->disableExport();
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
        $form = new Form(new MapSetting);


     $form->select('tiles', __('Tiles'))->options([
        1 => 'Route Mappy',
        2 => 'Google',
        ])->rules('required');
        $form->select('routing', __('Routing'))->options([
        1 => 'Route Mappy',
        2 => 'Google',
        ])->rules('required');         
        $form->select('places', __('Places'))->options([
        1 => 'Route Mappy',
        2 => 'Google',
        ])->rules('required');   
        $form->select('geo_code', __('Geocode'))->options([
        1 => 'Route Mappy',
        2 => 'Google',
        ])->rules('required');   
        $form->select('reverse_geo_code', __('Reverse Geoode'))->options([
        1 => 'Route Mappy',
        2 => 'Google',
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
