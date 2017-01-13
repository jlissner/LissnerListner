void function initCookbookPage($) {
	$(window).load(() => {
		$('[duck-table="Recipes"][duck-function="add"]').duckForm({successCallback: ()=> {
			window.location = `/${$('#AddRecipie').find('[duck-field="url"] input').val()}`
		}})
	});
}(jQuery.noConflict())