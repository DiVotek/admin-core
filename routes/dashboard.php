<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Cache;
use Tabuna\Breadcrumbs\Trail;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Orchid\Platform\Http\Screens\SearchScreen;
use Orchid\Platform\Http\Screens\FileManagerScreen;
use Orchid\Platform\Http\Screens\NotificationScreen;
use Orchid\Platform\Http\Controllers\AsyncController;
use Orchid\Platform\Http\Controllers\IndexController;
use Orchid\Platform\Http\Controllers\RelationController;
use Orchid\Platform\Http\Controllers\SortableController;
use Orchid\Platform\Http\Controllers\AttachmentController;
use Orchid\Platform\Http\Controllers\FileManagerController;

// Index and default...
Route::get('/', [IndexController::class, 'index'])
    ->name('index')
    ->breadcrumbs(fn (Trail $trail) => $trail->push(__('Home'), route('platform.index')));
Route::get('/platform/locale', function () {
    Session::put('locale', request()->input('locale'));
    Cache::put('locale', request()->input('locale'), now()->addYear());
    return redirect()->back();
})->name('localize');
Route::screen('search/{query}', SearchScreen::class)
    ->name('search')
    ->breadcrumbs(fn (Trail $trail, string $query) => $trail->parent('platform.index')
        ->push(__('Search'))
        ->push($query));

Route::post('async/{screen}/{method?}/{template?}', [AsyncController::class, 'load'])
    ->name('async');

Route::post('listener/{screen}/{layout}', [AsyncController::class, 'listener'])
    ->name('async.listener');


Route::post(config('platform.filemanager.uploadUrl'), [FileManagerController::class, 'upload'])->name('file_upload');
Route::screen(config('platform.filemanager.filesUrl'), FileManagerScreen::class)->name('files');

// TODO: Remove group
Route::prefix('systems')->group(function () {
    Route::post('files', [AttachmentController::class, 'upload'])
        ->name('systems.files.upload');

    Route::post('media', [AttachmentController::class, 'media'])
        ->name('systems.files.media');

    Route::post('files/sort', [AttachmentController::class, 'sort'])
        ->name('systems.files.sort');

    Route::delete('files/{id}', [AttachmentController::class, 'destroy'])
        ->name('systems.files.destroy');

    Route::put('files/post/{id}', [AttachmentController::class, 'update'])
        ->name('systems.files.update');

    Route::post('relation', [RelationController::class, 'view'])
        ->name('systems.relation');

    Route::post('sorting', [SortableController::class, 'saveSortOrder'])
        ->name('systems.sorting');
});

if (config('platform.notifications.enabled', true)) {
    Route::screen('notifications/{id?}', NotificationScreen::class)
        ->name('notifications')
        ->breadcrumbs(fn (Trail $trail) => $trail->parent('platform.index')
            ->push(__('Notifications')));

    Route::post('api/notifications', [NotificationScreen::class, 'unreadNotification'])
        ->name('api.notifications');
}

if (config('platform.fallback', true)) {
    Route::fallback([IndexController::class, 'fallback']);
}
