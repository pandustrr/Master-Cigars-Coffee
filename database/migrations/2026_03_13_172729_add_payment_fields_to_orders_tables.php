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
        Schema::table('sales_orders', function (Blueprint $table) {
            $table->decimal('total_price', 15, 2)->after('price')->nullable();
            $table->string('payment_proof')->after('payment_method')->nullable();
        });

        Schema::table('sales_packages', function (Blueprint $table) {
            $table->decimal('total_price', 15, 2)->after('package_type')->nullable();
            $table->string('payment_proof')->after('payment_method')->nullable();
            $table->string('status')->after('payment_proof')->default('Menunggu Pembayaran');
        });

        Schema::table('sales_point_corners', function (Blueprint $table) {
            $table->decimal('total_price', 15, 2)->after('service_type')->nullable();
            $table->string('payment_proof')->after('additional_info')->nullable();
            $table->string('status')->after('payment_proof')->default('Menunggu Pembayaran');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            $table->dropColumn(['total_price', 'payment_proof']);
        });

        Schema::table('sales_packages', function (Blueprint $table) {
            $table->dropColumn(['total_price', 'payment_proof', 'status']);
        });

        Schema::table('sales_point_corners', function (Blueprint $table) {
            $table->dropColumn(['total_price', 'payment_proof', 'status']);
        });
    }
};
