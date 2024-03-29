<?php

namespace Orchid\Screen\Fields;

use Orchid\Screen\Field;

class FileManager extends Field
{
    /**
     * Blade template
     *
     * @var string
     */
    protected $view = 'platform::fields.filemanager';

    /**
     * Default attributes value.
     *
     * @var array
     */
    protected $attributes = [
        'class' => 'form-control',
        'title' => 'File Picker',
        'allowMultiple' => 0,
        'value' => [],
        'mimes' => [],
        'watermarkPath' => null,
    ];

    /**
     * Attributes available for a particular tag.
     *
     * @var array
     */
    protected $inlineAttributes = [
        'name',
    ];

    /**
     * @return $this
     */
    public function multiple(): self
    {
        $this->set('allowMultiple', 1);

        return $this;
    }

    /**
     * @return $this
     */
    public function setWatermark(string $path): self
    {
        $this->set('watermarkPath', $path);

        return $this;
    }
}
