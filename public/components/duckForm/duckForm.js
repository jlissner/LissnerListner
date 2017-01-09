/* global jQuery, duck, window */

void function initCityFood($, duck, window) {
	'use strict'

	function deleteArrayItem(e) {
		e.stopPropagation();
		$(this).parent().remove();
	}

	function addArrayItem() {
		const $this = $(this);
		const $wrapper = $this.parent();
		const $item = $wrapper.find('> [duck-type]').first();
		const $clone = $item.clone();

		$clone.find('[duck-value], [duck-type="wysiwyg"]').val(null).on('mousedown', (e) => {e.stopPropagation()});
		$clone.find('.btn-danger').click(deleteArrayItem).on('mousedown', (e) => {e.stopPropagation()});

		if($item.attr('duck-type') === 'object'){
			$clone.find('input[type="checkbox"], input[type="radio"]').prop('checked', false);
			$clone.find('.summernote').parent().empty().append('<div class="summernote"></div>').find('> .summernote').summernote({height: 150});
			$clone.find('[duck-type="array"] > [duck-type]:not(:first-of-type)').remove();
			$clone.find('[duck-button="add"]').click(addArrayItem);
		}
		
		$wrapper.append($clone);
		$wrapper.sortable();
	}

	function removeFromObject(obj, path, value) {
		const pathList = typeof path === 'string' ? path.split('.') : path;
		const length = pathList.length

		for(let i = 0; i < length; i++){
			const field = pathList[i];
			const isLastItem = length === 1;
			const isObject = typeof obj[field] === 'object';

			if(isLastItem && !isObject){
				delete obj[field];
			} else if (!isObject){
				break;
			}

			const type = obj[field] instanceof Array ? 'array' : 'object';

			if(type === 'object'){
				const newPathList = pathList.slice(0);
				newPathList.splice(0, 1);

				obj[field] = removeFromObject(obj[field], newPathList, value);
			} else {
				const indexToSplice = isLastItem ?  obj[field].indexOf(value) : 
													obj[field].map((o) => o[pathList[i+1]]).indexOf(value);
				
				obj[field].splice(indexToSplice, 1)
			}
		}

		return obj;
	}

	function parseObject(obj, $item, fieldName, buildObjectFunction) {
		const key = $item.attr('duck-key');
		const newObj = obj[fieldName] || {};

		if(key && !newObj[key]){
			newObj[key] = $item.attr('duck-key-value') || duck.uuid();
		}

		obj[fieldName] = buildObjectFunction(newObj, $item.find('> [duck-field]'));
	}

	function parseArray(obj, $item, fieldName, buildObjectFunction) {
		const $objectToUpdate = $item.find('> [duck-type="object"]');
		const value = $objectToUpdate.first().attr('duck-key') ? obj[fieldName] : [];

		if($objectToUpdate.length) {
			$objectToUpdate.each((i, objec) => {
				const $objec = $(objec);
				const key = $objec.attr('duck-key');
				const keyValue = $objec.attr('duck-key-value') || duck.uuid();
				const newObj = key ? value.filter((o) => o[key] === keyValue)[0] : {}

				// if the key is defined, the object is being altered/added without the context of the other items
				if(key){
					// if the key doesn't have a preset value, give it a uuid
					newObj[key] = keyValue;

					// check to see if an item with the same key exists in the array
					const indexOfCurrentId = value.map((o) => o[key]).indexOf(newObj[key]);

					// if it does, remove it from the list of values
					if(indexOfCurrentId !== -1){
						value.splice(indexOfCurrentId, 1);
					}
				}

				// add the new object to the list of values
				value.push(buildObjectFunction(newObj, $objec.find('> [duck-field]')));
			});
		} else {
			$item.find('[duck-value]').each((i, arrayItem) => {
				const val = $(arrayItem).val();

				if(val){
					value.push(val);
				}
			});
		}

		if(obj[fieldName] || value.length){
			obj[fieldName] = value;
		}
	}

	function parseCheckbox(obj, $item, fieldName) {
		const value = [];

		$item.find('input[type="checkbox"]').each((j, checkbox) => {
			const $checkbox = $(checkbox);

			if($checkbox.prop('checked')){
				value.push($checkbox.val());
			}
		});

		if(obj[fieldName] || value.length){
			obj[fieldName] = value;
		}
	}

	function parseRadio(obj, $item, fieldName) {
		const value = $item.find('input[type="radio"]:checked').val();

		if(obj[fieldName] || value){
			obj[fieldName] = value;
		}
	}

	function parseWysiwyg(obj, $item, fieldName, editor) {
		const summernote = editor || '.summernote';
		const value = $item.find(summernote).summernote('code');

		if(value){
			obj[fieldName] = value;
		}
	}

	function buildObject(obj, $context) {
		$context.each((i, item) => {
			const $item = $(item);
			const fieldName = $item.attr('duck-field');
			const type = $item.attr('duck-type');

			switch(type){
				case 'object': {
					parseObject(obj, $item, fieldName, buildObject);

					break;
				}
				case 'array': {
					parseArray(obj, $item, fieldName, buildObject);

					break;
				}
				case 'checkbox': {
					parseCheckbox(obj, $item, fieldName);

					break;
				}
				case 'radio': {
					parseRadio(obj, $item, fieldName);

					break;
				}
				case 'bool': {
					obj[fieldName] = $item.prop('checked') || $item.find('input[type="checkbox"]').prop('checked');
					
					break;
				}
				case 'wysiwyg': {
					parseWysiwyg(obj, $item, fieldName);
					
					break;
				}
				case 'image':
				case 'select': 
				case 'number': 
				case 'string':
				default: {
					const isInputValue = $item.val();
					const value = isInputValue ? isInputValue : $item.find('[duck-value]').val();

					if(obj[fieldName] || value){
						obj[fieldName] = value;
					}

					break;
				}
			}
		});

		return obj;
	}

	function autoSetUrl($urlField, $urlFromField) {
		$urlFromField.on('input', () => {
			$urlField.val($urlFromField.val().replace(/'/g, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase());
		});
	}

	function duckForm(wrapper, options){
		const $wrapper = $(wrapper);
		const $startOfFields = $wrapper.find('> [duck-field]');
		//const $submit = $wrapper.find('[duck-button="submit"]');
		const $editButton = $wrapper.find('[duck-button="edit"]');
		const $cancelButton = $wrapper.find('[duck-button="cancel"]');
		const table = (options && options.table) || $wrapper.attr('duck-table');
		const crud = (options && options.crud) || $wrapper.attr('duck-function');
		const key = (options && options.key) || $wrapper.attr('duck-key');
		const keyValue = (options && options.keyValue) || $wrapper.attr('duck-key-value');
		const $urlField = $wrapper.find('[duck-field="url"] input');
		const successCallback = (options && options.successCallback) || (() => {window.location.reload(true)});
		const failureCallBack = (options && options.failureCallBack) || (() => {window.location.reload(true)});

		if($urlField.length){
			autoSetUrl($urlField, $wrapper.find('[duck-field="names"] [duck-field="display"] input'));
		}

		if(!table || !crud || !key || ((crud === 'update' || crud === 'delete') && !keyValue)) {
			return; // need to have a table, key, and it's function set, and must have key value if it's for an update or delete
		}

		$editButton.click(() => {
			$wrapper.attr('duck-edit-form', $wrapper.attr('duck-edit-form') === 'view' ? 'edit' : 'view');
		})

		$cancelButton.click(() => {
			$wrapper.attr('duck-edit-form', $wrapper.attr('duck-edit-form') === 'view' ? 'edit' : 'view');
		})

		// set what happens when the submit button is clicked
		$wrapper.on('click', '[duck-button="submit"]', (e) => {
			e.preventDefault();
			e.stopPropagation();

			$(e.currentTarget).prop('disabled', true);

			switch(crud){
				// adds an item to the table
				case 'add':{
					const item = {};
					item[key] = keyValue || duck.uuid();

					duck(table).add(buildObject(item, $startOfFields), successCallback, failureCallBack);

					break;
				}

				// updates an item from the table
				case 'update':{
					duck(table).get({field: key, value: keyValue, findOne: true}, (data) => {
						const item = buildObject(data, $startOfFields);
						duck(table).update(item, successCallback, failureCallBack);
					});

					break;
				}

				// deletes an item from the table
				case 'delete':{
					duck(table).delete(keyValue, () => {
						const currentLocation = window.location.href.split('/');
						const goTo = $wrapper.attr('duck-goTo');

						if(currentLocation[currentLocation.length - 1]){
							currentLocation.pop();
						} else {
							currentLocation.pop();
							currentLocation.pop();
						}

						const newLocation = goTo ? goTo : currentLocation.join('/');
						if(window.location.href === newLocation) {
							window.location.reload(true);
						} else{
							window.location.href = newLocation;
						}
					});

					break;
				}

				// deletes a field or value from an item in the table
				case 'deleteField':{
					const path = $wrapper.attr('duck-delete-path');
					const value = $wrapper.attr('duck-delete-value');

					duck(table).get({field: key, value: keyValue, findOne: true}, (data) => {
						const item = removeFromObject(data, path, value);

						duck(table).update(item, successCallback, failureCallBack);
					});

					break;
				}
				default:
			}
		});

		// set arrays to add and remove items
		$wrapper.find('[duck-type="array"]')
				.each((i, item) => {
					const $item = $(item);
					const $addItem = $('<button>', {
						'class': 'btn-small',
						'duck-button': 'add',
						type: 'button',
						click: addArrayItem,
						mousedown: (e) => {e.stopPropagation();},
					});

					$item.prepend($addItem);

					$item.find('> [duck-type]').each((j, subItem) => {
						const $subItem = $(subItem);
						const $deleteItem = $('<button>', {
							'class': 'btn-danger btn-small',
							'duck-button': 'delete',
							'type': 'button',
							click: deleteArrayItem,
							mousedown: (e) => {e.stopPropagation();},
						});

						$subItem.append($deleteItem);
					});
				})
				.sortable('[duck-type]')
				.find('[duck-value], [duck-type="wysiwyg"]')
				.on('mousedown', (e) => {e.stopPropagation()});
	}

	$.fn.duckForm = function init(options) {
		return this.each((index, wrapper) => {
			duckForm(wrapper, options);
		});
	}

	$(() => {$('[duck-table]').duckForm();});
}(jQuery.noConflict(), duck, window)