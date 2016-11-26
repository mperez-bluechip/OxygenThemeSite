<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('img', function($imgTable){
        $imgTable->increments('id');
        $imgTable->string('name',40);
        $imgTable->text('comments',250);
        $imgTable->string('type',11);
        $imgTable->date('created');
        $imgTable->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('img');
    }
}
