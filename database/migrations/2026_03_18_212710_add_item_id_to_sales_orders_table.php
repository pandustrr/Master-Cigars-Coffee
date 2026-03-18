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
            $table->unsignedBigInteger('sale_item_id')->nullable()->after('id');
        });
        Schema::table('sales_packages', function (Blueprint $table) {
            $table->unsignedBigInteger('sale_item_id')->nullable()->after('id');
        });
        Schema::table('sales_point_corners', function (Blueprint $table) {
            $table->unsignedBigInteger('sale_item_id')->nullable()->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            $table->dropColumn('sale_item_id');
        });
        Schema::table('sales_packages', function (Blueprint $table) {
            $table->dropColumn('sale_item_id');
        });
        Schema::table('sales_point_corners', function (Blueprint $table) {
            $table->dropColumn('sale_item_id');
        });
    }
};
