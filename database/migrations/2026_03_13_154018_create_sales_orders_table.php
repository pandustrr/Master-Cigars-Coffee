<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sales_orders', function (Blueprint $table) {
            $table->id();
            $table->string('product_photo')->nullable();
            $table->decimal('price', 15, 2);
            $table->integer('quantity');
            $table->string('customer_name');
            $table->text('address');
            $table->string('whatsapp');
            $table->string('shipping_choice');
            $table->string('payment_method');
            $table->string('status')->default('Diproses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_orders');
    }
};
