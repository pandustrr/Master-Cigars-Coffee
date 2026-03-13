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
            $table->string('tracking_code')->unique()->after('id');
        });
        Schema::table('sales_packages', function (Blueprint $table) {
            $table->string('tracking_code')->unique()->after('id');
        });
        Schema::table('sales_point_corners', function (Blueprint $table) {
            $table->string('tracking_code')->unique()->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            $table->dropColumn('tracking_code');
        });
        Schema::table('sales_packages', function (Blueprint $table) {
            $table->dropColumn('tracking_code');
        });
        Schema::table('sales_point_corners', function (Blueprint $table) {
            $table->dropColumn('tracking_code');
        });
    }
};
