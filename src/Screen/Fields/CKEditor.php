<?php
declare(strict_types=1);

namespace Orchid\Screen\Fields;

use Orchid\Screen\Field;

class CKEditor extends Field
{
	/** @var string */
	protected $view = 'platform::fields.ckeditor';

	/** @var array  */
	protected $attributes = [
		'options' => [],
	];

	public static function make(?string $name = null): CKEditor
	{
		return (new static())
			->name($name)
			->setOptions(config('platform.ckeditor.options', []));
	}

	public function setOptions(array $options): CKEditor
	{
		$this->attributes['options'] = $options;

		return $this;
	}

	public function mergeOptions(array $options): CKEditor
	{
		$this->attributes['options'] = array_merge($this->attributes['options'], $options);

		return $this;
	}
}
