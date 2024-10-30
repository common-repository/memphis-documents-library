jQuery('#mdocs-add-folder, #mdocs-add-file ,#mdocs-add-upload-btn').click(function(event) {
	event.preventDefault();
});
jQuery('.mdocs-insert-shortcode').click(function(event) {
	event.preventDefault();
	if (jQuery(this).data('button-type') == 'insert-folder') {
		var folder = jQuery('select[name="mdocs-folders"]').val();
		var sort_value = jQuery('select[name="mdocs-sort-values"]').val();
		var is_descending = jQuery('input[name="mdocs-add-folder-is-descending"]').prop('checked');
		var hide_folders = jQuery('input[name="mdocs-add-folder-hide-folders"]').prop('checked');
		wp.media.editor.insert('[mdocs folder="' + folder + '" hide_folder="'+hide_folders+'" sort_value="'+sort_value+'" is_descending="'+is_descending+'"]');
	} else if(jQuery(this).data('button-type') == 'insert-file') {
		var the_file = jQuery('input[name="mdocs-file"]:checked').val();
		wp.media.editor.insert('[mdocs single-file="' + the_file + '" ]');
	}
	
});


(function() {
    tinymce.PluginManager.add( 'mdocs_shortcode_dropdown', function( editor, url ) {
        // Add Button to Visual Editor Toolbar
        editor.addButton('mdocs_shortcode_dropdown', {
            title: 'mDocs Shortcodes',
			image: url + 'assets/imgs/mdocs-logo.png',
			type: 'menubutton',
			menu: [
				{
				text: mdocs_js.add_folder,
				onclick: function() {
					tb_show(mdocs_js.add_folder, "#TB_inline?&width=400&height=300&inlineId=mdocs-add-folder-modal");
					jQuery('#TB_ajaxContent').removeAttr("style");
					jQuery('#TB_ajaxContent').css('height', '90%');
					jQuery('#TB_closeWindowButton').blur();
				}},
				
				{
				text: mdocs_js.add_file,
				onclick: function() {
					tb_show(mdocs_js.add_file, "#TB_inline?&height=100%&inlineId=mdocs-add-file-modal");
					jQuery('#TB_ajaxContent').removeAttr("style");
					jQuery('#TB_ajaxContent').css('height', '90%');
					jQuery('#TB_closeWindowButton').blur();
				}},
			]
        });
    });
})();