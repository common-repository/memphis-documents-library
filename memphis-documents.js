var toggle_share = false;
// INITIALIZE THE ADMIN JAVASCRIPT
function mdocs_wp() {
    // ADDS A MEMPHIS DOCUMENTS TAG TO THE BODY FOR STYLE ISSUE FIXES
    jQuery('body').addClass('memphis-documents-library');
     // INITALIZE BOOTSTRAP TOOLTIP FUNCTIONALITY
    if(typeof(jQuery.fn.tooltip) == 'function') jQuery('[data-toggle="tooltip"]').tooltip();
    // ADD UPDATE DOCUMENT
    mdocs_add_update_documents();
    // TOOGLE DESCRIPTION/PREVIEW
    mdocs_toogle_description_preview();
    // DESRIPTION PREVIEW
    mdocs_description_preview();
    // FILE PREVIEW
    mdocs_file_preview();
    // IMAGE PREVIEW
    mdocs_image_preview();
    // RATING SYSTEM
    mdocs_ratings();
    // SORT OPTIONS
    mdocs_sort_files();
    // RATINGS SUBMIT
    mdocs_submit_rating('small');
    // SHARING MODAL
    mdocs_share_modal();
    // CHECK WITH OF DOCUMENTS CONTAINER
    //mdocs_check_width();
    //jQuery(window).resize(function() { mdocs_check_width(); });
    // MODAL TOGGLE
    mdocs_toggle_modals();
    // DROPDOWN MENU TOGGLE
    mdocs_toggle_dropdown_menu();
    // VERSIONS MODAL
    mdocs_versions();
    // MDOCS DEBUG
    mdocs_debug_active();
	// MDOCS REFRESH TABLE
	mdocs_refresh_table();
	// MDOCS SHARE BUTTON
	mdocs_share();
}
// INITIALIZE THE ADMIN JAVASCRIPT
function mdocs_admin() {
    if(typeof tinyMCE == 'object') tinyMCE.init({ remove_linebreaks: false, });  
    //FIX FOCUS ISSUE WITH TINYMCE TEXTBOXES
    jQuery(document).on('focusin', function(e) { e.stopImmediatePropagation(); });
    // MODAL CLOSE EVENT
    mdocs_modal_close();
    // INITALIZE BOOTSTRAP POPOVER FUNCTIONALITY
    //jQuery('[data-toggle="popover"]').popover();
    mdocs_color_pickers();
    // INITALIZE DRAGGABLE
    //jQuery(".draggable").draggable();
    // DISABLED SETTINGS
    mdocs_toogle_disable_setting('#mdocs-hide-all-files','#mdocs-hide-all-files-non-members');
    mdocs_toogle_disable_setting('#mdocs-hide-all-files-non-members','#mdocs-hide-all-files');
    mdocs_toogle_disable_setting('#mdocs-hide-all-posts','#mdocs-hide-all-posts-non-members');
    mdocs_toogle_disable_setting('#mdocs-hide-all-posts-non-members','#mdocs-hide-all-posts');
     // ADD UPDATE DOCUMENT
    mdocs_add_update_documents();
    // DESRIPTION PREVIEW
    mdocs_description_preview();
    // FILE PREVIEW
    mdocs_file_preview();
    // IMAGE PREVIEW
    mdocs_image_preview();
    // ADD MIME TYPE
    mdocs_add_mime_type();
    // REMOVE MIME TYPE
    mdocs_remove_mime_type();
    // RESTORE DEFAULT FILE TYPES
    mdocs_restore_default_mimes();
    // SORT OPTIONS
    mdocs_sort_files();
    // RATING SYSTEM
    mdocs_ratings();
    // SHARING MODAL
    mdocs_share_modal();
    // RUN 3.0 PATCH ON CLICK
    jQuery('#mdosc-3-0-patch-btn').click(function(event) {
	event.preventDefault();
	var numfiles = Number(jQuery(this).data('num-docs'));
	mdocs_v3_0_patch(numfiles);
    });
    // SOCIAL CLICKED
    jQuery('.mdocs-show-social').click(function() {
		var raw_id = '';
		var id = '';
	    if (jQuery(this).hasClass('fa fa-plus-sign-alt')) {
		    jQuery(this).removeClass('fa fa-plus-sign-alt');
		    jQuery(this).addClass('fa fa-minus-sign-alt');
		    raw_id = jQuery(this).prop('id');
			raw_id = raw_id.split("-");
			id = raw_id[raw_id.length-1];
	    jQuery('#mdocs-social-index-'+id).show();
	    } else {
		    jQuery(this).removeClass('fa fa-minus-sign-alt');
		    jQuery(this).addClass('icon-plus-sign-alt');
		    raw_id = jQuery(this).prop('id');
			raw_id = raw_id.split("-");
			id = raw_id[raw_id.length-1];
	    jQuery('#mdocs-social-index-'+id).hide();
	    }

    });
   // ADD ROOT CATEGORY
    jQuery('#mdocs-add-cat').click(function(event) { event.preventDefault(); });
    jQuery('input[id="mdocs-cat-remove"]').click(function() {
	var confirm = window.confirm(mdocs_js.category_delete);
	var cat = jQuery(this).prop('name');
	if (confirm) {
		jQuery('[name="mdocs-cats['+cat+'][remove]"]').prop('value',1);
		jQuery('#mdocs-cats').submit();
	}
    });
    /*
    jQuery('#mdocs-file-status').change(function() {
	    if (jQuery(this).val() == 'hidden') jQuery('#mdocs-post-status').prop('disabled','true');
	    else if (jQuery(this).val() == 'public') jQuery('#mdocs-post-status').removeAttr('disabled');
    });
    */
    // BOX VIEW REFRESH
    mdocs_box_view_refresh();
    // CHECK WITH OF DOCUMENTS CONTAINER
    //mdocs_check_width();
    //jQuery(window).resize(function() { mdocs_check_width(); });
    // FIND LOST FILES
    mdocs_find_lost_files();
    // MODAL TOGGLE
    mdocs_toggle_modals();
    mdocs_toggle_batch_select_all();
    // ACTIVATE BATCH OPTIONS
    mdocs_activate_batch_options();
    // MDOCS DEBUG
    mdocs_debug_active();
    // POST PAGE TITLE FONT SIZE
    mdocs_post_page_title_font_size();
    // SETTING PAGE POST PAGE SETTINGS
    mdocs_post_page_settings();
    // FOLDER EDITOR
    mdocs_folder_editor();
	// DELETE FILE
	mdocs_delete_file();
	// MDOCS REFRESH TABLE
	mdocs_refresh_table();
	// MANAGE VERSIONS
	mdocs_manage_versions();
	// RESTORE TO DEFAULT SETTINGS
	mdocs_restore_default();
}
 // ADD / UPDATE DOCUMENTS
function mdocs_add_update_documents() {
	jQuery('#mdocs-add-update-form').submit(function(event) {
		//this.submit();
		//this.reset();
		//return false;
		//event.preventDefault();
		//form_data = jQuery(this).serialize();
		//jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax','type': 'upload-document', 'form-data': form_data, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce},function(data) {
			//jQuery('#mdocs-add-update-form').append(form_data);
		//});
	});
	
	
    jQuery('.add-update-btn, #mdocs-upload-frontend').click(function(event) {
		var action_type = jQuery(this).data('action-type');
		var mdocs_id = jQuery(this).data('mdocs-id');
		var current_cat = jQuery(this).data('current-cat');
		var nonce = jQuery(this).data('nonce');
		var is_admin = jQuery(this).data('is-admin');
		jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', 'type': action_type,'mdocs-id': mdocs_id, 'current-cat': current_cat, 'is-admin': is_admin, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce},function(data) {
			var action_text = 'Add Document';
			var doc_data = JSON.parse(data);
			console.log(data);
			if (doc_data.error != null) {
				alert(doc_data.error);
			} else {
			jQuery("#mdocs-post-categories option").each(function(){ jQuery(this).prop('selected', false); });
			if (action_type == 'update-doc') {
				if (doc_data['mdocs-categories'] != null) {
					jQuery("#mdocs-post-categories option").each(function() {
						for (i = 0; i < doc_data['mdocs-categories'].length; i++) { 
							if(doc_data['mdocs-categories'][i] == jQuery(this).prop('value')) {
								jQuery(this).prop('selected', true);
							}
						}
					});
				}
				if (jQuery('input[name="mdocs-is-admin"]').val() == true) jQuery('#mdocs-add-update-form').prop('action', jQuery('input[name="mdocs-permalink"]').val()+'&mdocs-cat='+current_cat);
				else jQuery('#mdocs-add-update-form').prop('action', jQuery('input[name="mdocs-permalink"]').val());
				jQuery('input[name="mdocs-type"]').prop('value', 'mdocs-update');
				jQuery('input[name="mdocs-index"]').prop('value', mdocs_id);
				jQuery('input[name="mdocs-pname"]').prop('value', doc_data.name);
				jQuery('input[name="mdocs-post-status-sys"]').prop('value', doc_data.post_status);
				action_text = mdocs_js.update_doc+' <small>'+doc_data.filename+'</small>';
				jQuery('#mdocs-current-doc').html(mdocs_js.current_file+': '+doc_data.filename);
				doc_data.name = doc_data.name.replace(/\\/g, '');
				doc_data.name = doc_data.name.replace(/&quot;/g, '');
				jQuery('input[name="mdocs-name"]').prop('value',doc_data.name);
				jQuery('option[value="'+doc_data.cat+'"]').prop('selected',true);
				jQuery('input[name="mdocs-version"]').prop('value', doc_data.version);
				jQuery('input[name="mdocs-tags"]').prop('value', doc_data['post-tags']);
				jQuery('input[name="mdocs-last-modified"]').prop('value', doc_data.gmdate);
				if (doc_data.show_social == 'on') jQuery('input[name="mdocs-social"]').prop('checked',true);
				else jQuery('input[name="mdocs-social"]').prop('checked',false);
				if (doc_data.non_members == 'on') jQuery('input[name="mdocs-non-members"]').prop('checked',true);
				else jQuery('input[name="mdocs-non-members"]').prop('checked',false);
				//if(doc_data['file_status'] == 'hidden') jQuery("#mdocs-post-status").prop('disabled', true);
				jQuery("#mdocs-file-status option").each(function() {
				if(doc_data.file_status == jQuery(this).val()) jQuery(this).prop('selected',true);
				});
				jQuery("#mdocs-post-status option").each(function() {
				if(doc_data.post_status == jQuery(this).val()) jQuery(this).prop('selected',true);
				});
				jQuery('#mdocs-current-owner').html('<i class="fa fa-user" aria-hidden="true"></i> '+doc_data.owner);
				jQuery('.mdocs-contributors-container').append('<input type="hidden" value="'+doc_data.owner+'" name="mdocs-owner-value"/>');
				jQuery('input[name="mdocs-real-author"]').prop('value', doc_data.author);
				mdocs_contributor_editor(doc_data);
				doc_data.desc = doc_data.desc.replace(/\\/g, '');
				doc_data.desc = doc_data.desc.replace(/&quot;/g, '');
				doc_data.desc = doc_data.desc;
				if(typeof tinyMCE == 'object' && tinyMCE.activeEditor != null) tinyMCE.activeEditor.setContent(doc_data.desc);
				else jQuery('#mdocs-desc').text(doc_data.desc);
				jQuery('#mdocs-save-doc-btn').prop('value', mdocs_js.update_doc_btn);
				jQuery('input[name="mdocs"]').change(function() {
				jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', 'type': 'update-date', '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce},function(the_date) {
					var date = JSON.parse(the_date);
					jQuery('input[name="mdocs-last-modified"], input[name="mdocs-last-modified-display"]').val(date['formated-date']);
				});
				});
			} else {
				if (jQuery('input[name="mdocs-is-admin"]').val() == true) jQuery('#mdocs-add-update-form').prop('action', jQuery('input[name="mdocs-permalink"]').val()+'&mdocs-cat='+current_cat);
				else jQuery('#mdocs-add-update-form').prop('action', jQuery('input[name="mdocs-permalink"]').val());
				jQuery('input[name="mdocs-name"]').val('');
				jQuery('option[value="'+current_cat+'"]').prop('selected', true);
				jQuery('input[name="mdocs-version"]').val('1.0');
				jQuery('#mdocs-current-doc').html('');
				jQuery('#mdocs-current-owner').html('<i class="fa fa-user" aria-hidden="true"></i> '+jQuery('input[name="mdocs-current-user"]').val());
				jQuery('.mdocs-contributors-container').append('<input type="hidden" value="'+jQuery('input[name="mdocs-current-user"]').val()+'" id="mdocs-owner-value"/>');
				 if(typeof tinyMCE == 'object' && tinyMCE.activeEditor != null) tinyMCE.activeEditor.setContent('');
				else jQuery('#mdocs-desc').text('');
				jQuery('input[name="mdocs-type"]').prop('value', 'mdocs-add');
				jQuery('input[name="mdocs-last-modified"], input[name="mdocs-last-modified-display"]').prop('value', doc_data.gmdate);
				mdocs_contributor_editor(doc_data);
				action_text = mdocs_js.add_doc;
				jQuery('#mdocs-save-doc-btn').prop('value', mdocs_js.add_doc_btn);
			}
			jQuery('#mdocs-add-update-header').html(action_text);
			}
		});
    });
}

// CONTRIBUTOR EDITOR
function mdocs_contributor_editor(doc_data) {
    jQuery('button[id^="mdocs-contributors["]').each(function() { jQuery(this).remove(); });
    jQuery('input[name^="mdocs-contributors["]').each(function() { jQuery(this).remove(); });
    if (doc_data.contributors == null) doc_data.contributors = {};
    var obj = doc_data.contributors;
    for (var i in obj) {
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(i)) continue;
		jQuery('.mdocs-contributors-container').append(' <button type="button" class="btn btn-success" id="mdocs-contributors['+i+']" data-index="'+i+'"><i class="fa fa-user " aria-hidden="true"></i> '+doc_data.contributors[i]+' <i class="fa fa-times mdocs-contributors-delete-btn" id="mdocs-contributors-delete[mdocs-contributors['+i+']]" aria-hidden="true"></i></span>');
		jQuery('.mdocs-contributors-container').append('<input type="hidden" value="'+doc_data.contributors[i]+'" name="mdocs-contributors['+i+']" data-contributor-index="'+i+'"/>');
    }
    activate_contributors_delete_btn();
    jQuery('.mdocs-add-contributors').focusout(function() {
	jQuery(this).prop('value', '');
	//jQuery(this).parent().children('.mdocs-user-search-list').addClass('hidden');
    });
	
    jQuery('.mdocs-add-contributors').keyup(function() {
		var search_string_length = jQuery(this).val().length;
		if (search_string_length > 1) {
			var mdocs_index = jQuery(this).parent().data('mdocs-index');
			var contributors = [];
			jQuery('input[name^="mdocs-contributors"], input[name^="mdocs-batch-edit['+mdocs_index+']"]').each(function() {
			contributors.push(jQuery(this).val()); 
			 });
			jQuery(this).parent().children('.mdocs-user-search-list').removeClass('hidden');
			jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', 'type': 'search-users', 'user-search-string': jQuery(this).val(), 'owner': jQuery('input[name="mdocs-owner-value"]').val(), 'contributors':contributors, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
			jQuery('.mdocs-user-search-list').html(data);
			jQuery('.mdocs-search-results-roles, .mdocs-search-results-users').click(function(event) {
				event.preventDefault();
				var mdoc_contributor_container = jQuery(this).parent().parent().parent().children('.mdocs-contributors-container');
				var mdocs_contributor_type =  jQuery(this).parent().parent().parent().data('contributor-type');
				var contributor_index = '';
				if(mdocs_contributor_type == 'add-update') {
					contributor_index = mdoc_contributor_container.children().last().data('contributor-index');
					if (contributor_index == undefined) contributor_index = 0;
					else contributor_index = contributor_index+1;
					mdoc_contributor_container.append(' <button type="button" class="btn btn-success" id="mdocs-contributors['+contributor_index+']" data-index="'+contributor_index+'"><i class="fa fa-user" aria-hidden="true"></i> '+jQuery(this).data('value')+' <i class="fa fa-times mdocs-contributors-delete-btn" id="mdocs-contributors-delete[mdocs-contributors['+contributor_index+']]" aria-hidden="true"></i></button>');
					mdoc_contributor_container.append('<input type="hidden" value="'+jQuery(this).data('value')+'" name="mdocs-contributors['+contributor_index+']" data-contributor-index="'+contributor_index+'"/>');
				} else if(mdocs_contributor_type == 'batch-edit') {
					var mdocs_index = mdoc_contributor_container.data('mdocs-index');
					contributor_index = mdoc_contributor_container.children().last().data('contributor-index');
					if (contributor_index == undefined) contributor_index = 0;
					else contributor_index = contributor_index+1;
					mdoc_contributor_container.append('<input type="hidden" name="mdocs-batch-edit['+mdocs_index+'][contributors]['+contributor_index+']" value="'+jQuery(this).data('value')+'" >');
					mdoc_contributor_container.append('<button type="button" class="btn btn-sm btn-success" data-mdocs-index="'+mdocs_index+'" data-contributor-index="'+contributor_index+'"><i class="fa fa-user" aria-hidden="true"></i> '+jQuery(this).data('value')+' <i class="fa fa-times mdocs-contributors-delete-btn" aria-hidden="true"></i></button>');								
				}
				jQuery('.mdocs-add-contributors').val('');
				jQuery('.mdocs-user-search-list').html('');
				jQuery('.mdocs-user-search-list').addClass('hidden');
				activate_contributors_delete_btn();
			});
			});
		} else  {
			jQuery('.mdocs-user-search-list').addClass('hidden');
			jQuery('.mdocs-user-search-list').html();
		}
    });
}
//ACTIVATE CONTRIBUTOR DELETE BUTTON
function activate_contributors_delete_btn() {
    jQuery('.mdocs-contributors-delete-btn').click(function() {
	var index = jQuery(this).parent().data('index');
	var mdocs_index = jQuery(this).parent().data('mdocs-index');
	var contributor_index = jQuery(this).parent().data('contributor-index');
	jQuery(this).parent().remove();
	jQuery('input[name="mdocs-contributors['+index+']"]').remove();
	jQuery('input[name="mdocs-batch-edit['+mdocs_index+'][contributors]['+contributor_index+']"]').remove();
    });
}
// ADD ROOT CATEGORY
function add_main_category(total_cats) {
    mdocs_add_sub_cat(total_cats, '', 0, jQuery('#the-list'), true);
}
// === COLOR PICKERS === //
//INITIALIZE IRIS COLOR PICKER
function mdocs_color_pickers() {
    var button_bg_color_normal = jQuery('#bg-color-mdocs-picker').prop('value');
    var button_bg_color_hover = jQuery('#bg-hover-color-mdocs-picker').prop('value');
    var button_text_color_normal = jQuery('#bg-text-color-mdocs-picker').prop('value');
    var button_text_color_hover =  jQuery('#bg-text-hover-color-mdocs-picker').prop('value');
    var navbar_bg_color = jQuery('input[name="mdocs-navbar-bgcolor"]').prop('value');
    var navbar_border_color = jQuery('input[name="mdocs-navbar-bordercolor"]').prop('value');
    var navbar_text_color_normal = jQuery('#navbar-text-color-normal-mdocs-picker').prop('value');
    var navbar_text_color_hover = jQuery('#navbar-text-color-hover-mdocs-picker').prop('value');
    var color_options = {
	change: function(event, ui) {
	    var element = jQuery(this).prop('id');
	    if (element == 'bg-color-mdocs-picker') {
		button_bg_color_normal = ui.color.toString();
		jQuery('.mdocs-download-btn-config').css('background', button_bg_color_normal);
		jQuery('.mdocs-download-btn-config').css('border', "solid 1px "+button_bg_color_normal);
	    } else if (element == 'bg-hover-color-mdocs-picker') button_bg_color_hover = ui.color.toString();
	    if (element == 'bg-text-color-mdocs-picker') {
		button_text_color_normal = ui.color.toString();
		jQuery('.mdocs-download-btn-config').css('color', button_text_color_normal);
	    } else if (element == 'bg-text-hover-color-mdocs-picker') button_text_color_hover = ui.color.toString();
	    if (element == 'navbar-bg-color-mdocs-picker') {
		navbar_bg_color = ui.color.toString();
		jQuery('.mdocs-navbar-default-config').css('background', navbar_bg_color);
	    }
	    if (element == 'navbar-border-color-mdocs-picker') {
		navbar_border_color = ui.color.toString();
		jQuery('.mdocs-navbar-default-config').css('border-color', navbar_border_color);
	    }
	    if (element == 'navbar-text-color-normal-mdocs-picker') {
		navbar_text_color_normal = ui.color.toString();
		jQuery('.mdocs-navbar-a-config').css('color', navbar_text_color_normal);
		//jQuery('.mdocs-navbar-a-config:hover').css('color', navbar_text_color_hover);
	    } else if (element == 'navbar-text-color-hover-mdocs-picker') navbar_text_color_hover = ui.color.toString();
	}
    };
    if (typeof(jQuery('.mdocs-color-picker').wpColorPicker) == 'function') {
	jQuery('.mdocs-color-picker').wpColorPicker(color_options);
	jQuery('[id$="mdocs-picker"]').wpColorPicker(color_options);
    } 
    // HOVER ADMIN DOWNLOAD BUTTON PREVIEW
    jQuery('.mdocs-download-btn-config').hover(
	function() {
	    jQuery(this).css('background', button_bg_color_hover);
	    jQuery(this).css('color', button_text_color_hover);
	}, function() {
	    jQuery(this).css('background', button_bg_color_normal);
	    jQuery(this).css('color', button_text_color_normal);
	}
    );
    jQuery('.mdocs-navbar-a-config').hover(
	function() {
	    jQuery(this).css('color', navbar_text_color_hover);
	}, function() {
	    jQuery(this).css('color', navbar_text_color_normal);
	}
    );
}
// === ALLOWED FILE TYPES === //
// RESTORE MIME TYPES
function mdocs_restore_default_mimes() {
    jQuery('#mdocs-restore-default-file-types').click(function(event) {
	event.preventDefault();
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'restore-mime', is_admin: true, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	    jQuery('.mdocs-mime-table').html(data);
	    mdocs_remove_mime_type();
	    mdocs_add_mime_type();
	});
    });
}
// ADD MIME TYPE
function mdocs_add_mime_type() {
    jQuery('#mdocs-add-mime').click(function(event) {
	event.preventDefault();
	var file_extension = jQuery('input[name="mdocs-file-extension"]').val();
	var mime_type = jQuery('input[name="mdocs-mime-type"]').val();
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'add-mime', file_extension: file_extension, mime_type: mime_type, is_admin: true, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	    jQuery(data).insertBefore('.mdocs-mime-submit');
	    mdocs_remove_mime_type();
	    jQuery('input[name="mdocs-file-extension"]').val('');
	    jQuery('input[name="mdocs-mime-type"]').val('');
	});
    });
}
// REMOVE MIME TYPE
function mdocs_remove_mime_type() {
    jQuery('.mdocs-remove-mime').click(function(event) {
	event.preventDefault();
	var file_extension = jQuery(this).parent().parent().data('file-type');
	jQuery(this).parent().parent().remove();
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'remove-mime', file_extension: file_extension, is_admin: true, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) { });
    });
}
// ========================== //
// ADD SUB CATEGORY
//var subcat_index = 0;
var add_button_clicks = 1;
function mdocs_add_sub_cat(total_cats, parent, parent_depth, object, is_parent) {
    //mdocs_set_onleave();
    
    jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'mdocs-cat-index', 'check-index': jQuery('#mdocs-cats').data('check-index'), '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	var subcat_index = parseInt(data);
	var check_index = subcat_index+1;
	jQuery('#mdocs-cats').data('cat-index', subcat_index);
	jQuery('#mdocs-cats').data('check-index', check_index);
	var child_depth = parseInt(parent_depth)+1;
	var parent_id = 'class="mdocs-cats-tr"';
	if (child_depth <= mdocs_js.levels) {
	    jQuery('input[name="mdocs-update-cat-index"]').val(add_button_clicks++);
	    var padding = 'style="padding-left: '+(40*child_depth)+'px; "';
	    if (subcat_index == 0) subcat_index = parseInt(total_cats)+1;
	    else subcat_index++;
	    var order = parseInt(jQuery('input[name="mdocs-cats['+parent+'][num_children]"]').val())+1;
	    var disabled = '';
	    jQuery('input[name="mdocs-cats['+parent+'][num_children]"]').val(order);
	    if (is_parent) {
		padding = 0;
		order = jQuery('.wp-list-table > tbody > tr').size()+1;
		disabled = '';
		child_depth = 0;
		parent_id = 'class="mdocs-cats-tr parent-cat"';
	    }
		var parent_index = 0;
	    if (jQuery('input[name="mdocs-cats['+parent+'][index]"]').val() != undefined) {
			parent_index = jQuery('input[name="mdocs-cats['+parent+'][index]"]').val();
	    } 
	    subcat_index = jQuery('#mdocs-cats').data('cat-index');
	    var html = ''+
		'<tr '+parent_id+'>'+
		    '<td  id="name" '+padding+' >'+
				'<input type="hidden" name="mdocs-cats[mdocs-cat-'+subcat_index+'][index]" value="'+subcat_index+'"/>'+
				'<input type="hidden" name="mdocs-cats[mdocs-cat-'+subcat_index+'][parent_index]" value="'+parent_index+'"/>'+
				'<input type="hidden" name="mdocs-cats[mdocs-cat-'+subcat_index+'][num_children]" value="0" />'+
				'<input type="hidden" name="mdocs-cats[mdocs-cat-'+subcat_index+'][depth]" value="'+child_depth+'"/>'+
				'<input type="hidden" name="mdocs-cats[mdocs-cat-'+subcat_index+'][parent]" value="'+parent+'"/>'+
				'<input type="hidden" name="mdocs-cats[mdocs-cat-'+subcat_index+'][slug]" value="mdocs-cat-'+subcat_index+'" />'+
				'<input type="text" name="mdocs-cats[mdocs-cat-'+subcat_index+'][name]"  value="'+mdocs_js.new_category+'"  />'+
		    '</td>'+
		    '<td id="order">'+
			'<input  type="text" name="mdocs-cats[mdocs-cat-'+subcat_index+'][order]"  value="'+order+'" '+disabled+' />'+
		    '</td>'+
		    '<td id="remove">'+
				'<input type="hidden" name="mdocs-cats[mdocs-cat-'+subcat_index+'][remove]" value="0"/>'+
			    '<input type="button" id="mdocs-sub-cats-remove-new-'+subcat_index+'" class="btn btn-primary" value="Remove"  />'+
		    '</td>'+
		    '<td id="add-cat">'+
				'<input type="button" class="mdocs-add-sub-cat btn btn-primary" id="mdocs-sub-cats-add-new-'+subcat_index+'" value="'+mdocs_js.add_folder+'""   />'+
		    '</td>'+
		'</tr>';
	    if (jQuery(object).prop('id') == 'the-list') jQuery(object).append(html);
	    else jQuery(html).insertAfter(jQuery(object).parent().parent());
	    jQuery('input[id="mdocs-sub-cats-remove-new-'+subcat_index+'"]').click(function() {
		jQuery('input[name="mdocs-cats['+parent+'][num_children]"]').val(order-1);
		jQuery(this).parent().parent().remove();
	    });
	    jQuery('input[id="mdocs-sub-cats-add-new-'+subcat_index+'"]').click(function() {
		var id = jQuery(this).prop('id').split('-');
		id = id[id.length-1];
		var parent = jQuery('input[name="mdocs-cats[mdocs-cat-'+id+'][parent]"]').val();
		var slug = jQuery('input[name="mdocs-cats[mdocs-cat-'+id+'][slug]"]').val();
		var depths = jQuery('input[name="mdocs-cats[mdocs-cat-'+id+'][depth]"]').val();
		//console.debug(jQuery('input[name="mdocs-cats[mdocs-cat-'+id+'][depth]"]').val());
		//alert(jQuery('input[name="mdocs-cats[mdocs-cat-3][depth]"]').val());
		mdocs_add_sub_cat(subcat_index,slug, depths, this);
	    });
	    
	} else alert(mdocs_js.category_support);
	//jQuery('.mdocs-add-sub-cat').unbind('click');
    });

}
// FUNCTIONS
function mdocs_set_onleave() { window.onbeforeunload = function() { return mdocs_js.leave_page;}; }
function mdocs_reset_onleave() { window.onbeforeunload = null; }
function mdocs_download_zip(zip_file) {
    jQuery('#mdocs-export-container .panel-body').append('<br><div class="alert alert-warning text-center" role="alert" id="mdocs-export-cog"><i class="fa fa-cog fa-2x fa-spin" aria-hidden="true"></i> '+mdocs_js.create_export_file+'</div>');
    jQuery('#mdocs-export-submit').addClass('disabled');
    jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'mdocs-export', 'zip-file': zip_file, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
		var mdocs_export_data = {};
		jQuery.each(jQuery('#mdocs-export').serializeArray(), function() { mdocs_export_data[this.name.replace(/-/g,'_')] = this.value; });
		jQuery('#mdocs-export-cog').html(mdocs_js.export_creation_complete_starting_download);
		jQuery('#mdocs-export-cog').delay(3000).fadeOut(1000, function() { jQuery('#mdocs-export-cog').remove(); jQuery('#mdocs-export-submit').removeClass('disabled'); });
		jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'mdocs-export-cleanup', 'mdocs-export-donot-delete': mdocs_export_data.mdocs_export_donot_delete, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
			window.location.href = '?mdocs-export-file='+zip_file+'&mdocs-export-donot-delete='+mdocs_export_data.mdocs_export_donot_delete;
		});
		
    });
}
function mdocs_download_current_version(version_id) {window.location.href = '?mdocs-file='+version_id; }
//function mdocs_download_version(version_id) { window.location.href = '?mdocs-file='+version_id; }
// DOWNLOAD VERSION
function mdocs_download_version(file_id, version_file) { window.location.href = '?mdocs-file='+file_id+'&mdocs-version='+version_file; }
// DELETE VERSION
function mdocs_delete_version() {
    jQuery('input[name="mdocs-delete-version-btn"]').click(function(event) {
		event.preventDefault();
		var confirm = window.confirm(mdocs_js.version_delete);
		if (confirm) {
			var object = this;
			jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'delete-version', 'archive': jQuery(this).data('archive'), 'mdocs-id': jQuery(this).data('mdocs-id'), '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
				jQuery(object).parent().parent().remove();
			});
		}
	});
}
function mdocs_download_file(mdocs_file, mdocs_url) { window.location.href = '?mdocs-file='+mdocs_file+'&mdocs-url=false'; }
function mdocs_share() {
	jQuery('.mdocs-share-btn').click(function(event) {
		if(jQuery(this).data('show') == false) {
			jQuery(this).data('show', true);
			var permalink = jQuery(this).data('permalink');
			var direct_download = jQuery(this).data('direct-download');
			jQuery(this).parent().remove('mdocs-share-links');
			jQuery(this).parent().append('<div class="mdocs-share-links">'+
				'<div class="well well-sm"><h3><i class="fas fa-arrow-circle-right" aria-hidden="true"></i> Download Page</h3><p>'+permalink+'</p></div>'+
				'<div class="well well-sm"><h3><i class="fa fa-download" aria-hidden="true"></i> Direct Download</h3><p>'+direct_download+'</p></div>'+
				'</div>');
		} else if(jQuery(this).data('show') == true) {
			jQuery(this).parent().children('.mdocs-share-links').remove();
			jQuery(this).data('show', false);
		}
	});
}
function mdocs_toogle_disable_setting(main, disable) {
	var checked = jQuery(main).prop('checked');
	if (checked) jQuery(disable).prop('disabled', true);
	else jQuery(disable).prop('disabled', false);
	jQuery(main).click(function() {
		var checked = jQuery(this).prop('checked');
		if (checked) jQuery(disable).prop('disabled', true);
		else jQuery(disable).prop('disabled', false);
	});
}
// RATINGS
function mdocs_ratings() {
    // DISPLAY RATING WIDGET
    jQuery('.ratings-button' ).click(function(event) {
	jQuery('.mdocs-ratings-body').empty();
	var mdocs_file_id = jQuery(this).data('mdocs-id');
	var mdocs_is_admin = jQuery(this).data('is-admin');
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'rating',mdocs_file_id: mdocs_file_id, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
		jQuery('.mdocs-ratings-body').html(data);
		mdocs_submit_rating('large',mdocs_file_id);
	});
    });
}
function mdocs_submit_rating(size,file_id) {
    var my_rating = jQuery('.mdocs-ratings-stars').data('my-rating');
    if (size == 'large') {
	size = 'fa-5x';
	for (index = 1; index < 6; ++index) {
	if (my_rating >= index) jQuery('#'+index).prop('class', 'fas fa-star '+size+'  mdocs-gold mdocs-my-rating');
	    else  jQuery('#'+index).prop('class', 'far fa-star '+size+' mdocs-my-rating');
	}
    } else size = 'fa-xs';
	
	
    jQuery('.mdocs-my-rating').click(function(event) {
		if (size == 'fa-xs') file_id = jQuery('.mdocs-post-header').data('mdocs-id');
		my_rating = jQuery(this).prop('id');
		jQuery('.mdocs-ratings-stars').data('my-rating', my_rating);
		jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'rating-submit',mdocs_file_id: file_id, 'mdocs-rating': my_rating, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
			jQuery('#mdocs-rating').modal('hide');
			//mdocs_table_func(this);
			//jQuery('.mdocs-container').html(data);
		});
		
    });
    
    jQuery('.mdocs-my-rating').mouseover(function() {
	for (index = 1; index < 6; ++index) {
	    if (this.id >= index) jQuery('#'+index).prop('class', 'fas fa-star '+size+' mdocs-gold mdocs-my-rating');
	    else  jQuery('#'+index).prop('class', 'far fa-star '+size+' mdocs-my-rating');
	}
    });
    jQuery('.mdocs-rating-container-small, .mdocs-rating-container').mouseout(function() {
	my_rating = jQuery('.mdocs-ratings-stars').data('my-rating');
	for (index = 1; index < 6; ++index) {
	    if (my_rating >= index) jQuery('#'+index).prop('class', 'fas fa-star '+size+'  mdocs-gold mdocs-my-rating');
	    else  jQuery('#'+index).prop('class', 'far fa-star '+size+' mdocs-my-rating');
	}
    });
}
// RESTORE DEFAULT
function mdocs_restore_default() {
	jQuery('#mdocs-retore-defaults-form').submit(function(event) {
		event.preventDefault();
		var form_data = jQuery(this).serializeArray();
		
		var returnArray = {};
		for (var i = 0; i < form_data.length; i++){
		  returnArray[form_data[i].name] = form_data[i].value;
		}
		form_data = returnArray;
		
		
		
		if (confirm(mdocs_js.restore_warning)) {
		jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type:'restore', blog_id: mdocs_js.blog_id, 'form-data': form_data, is_admin: true, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce},function(data) {
			//window.location.href = "admin.php?page=memphis-documents.php&restore-default=true";
		});
		}
	});

}
// DESRIPTION PREVIEW
function mdocs_description_preview() {
    jQuery('.description-preview' ).click(function(event) {
	jQuery('.mdocs-description-preview-body').empty();
	var mdocs_file_id = jQuery(this).data('mdocs-id');
	var mdocs_is_admin = jQuery(this).data('is-admin');
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'desc','mdocs-file': mdocs_file_id, show_type: 'desc', '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	    jQuery('.mdocs-description-preview-body').html(data);
	});
    });
}
// FILE PREVIEW
function mdocs_file_preview() {
    jQuery('.file-preview' ).click(function(event) {
	jQuery('.mdocs-file-preview-body').empty();
	var mdocs_file_id = jQuery(this).data('mdocs-id');
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'preview','mdocs-file': mdocs_file_id, show_type: 'preview', '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	    jQuery('.mdocs-file-preview-body').html(data);
	});
    });
}
// IMAGE PREVIEW
function mdocs_image_preview() {
     jQuery('.img-preview' ).click(function() {
	jQuery('.mdocs-file-preview-body').empty();
	var mdocs_file_id = jQuery(this).data('mdocs-id');
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'preview','mdocs-file': mdocs_file_id, show_type: 'preview' , '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	    jQuery('.mdocs-file-preview-body').html(data);
	});
    });
}
// TOOGLE DESCRIPTION/PREVIEW/VERSIONS
function mdocs_toogle_description_preview() {
    jQuery('.mdocs-nav-tab' ).click(function(event) {
	event.preventDefault();
	jQuery('.mdocs-nav-tab').each(function() { jQuery(this).removeClass('mdocs-nav-tab-active'); });
	jQuery(this).addClass('mdocs-nav-tab-active');
	jQuery('#mdocs-show-container-'+mdocs_file_id).empty();
	var mdocs_file_id = jQuery(this).data('mdocs-id');
	var show_type = jQuery(this).data('mdocs-show-type');
	jQuery('#mdocs-show-container-'+mdocs_file_id).html('<div style="width: 100%; text-align: center; overflow: hidden; padding-top: 100px;"><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i></div>');
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type:'show', show_type:show_type,'mdocs-file': mdocs_file_id, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	    jQuery('#mdocs-show-container-'+mdocs_file_id).html(data);
	});
    });
}
// SORT FUNCTIONALITY
function mdocs_sort_files() {
    jQuery('.mdocs-sort-option').click(function() {
	if (jQuery(this).data('disable-user-sort') == false) {
	    var permalink = jQuery(this).data('permalink');
	    var current_cat = jQuery(this).data('current-cat');
	    var sort_type = jQuery(this).data('sort-type');
	    var sort_range = jQuery(this).children(':first').prop('class');
	    if (sort_range == 'fa fa-chevron-down') {
		sort_range = 'asc';
	    } else sort_range = 'desc';
	    jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'sort', sort_type: sort_type, sort_range: sort_range, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
		//jQuery('.mdocs-container').html(data);
		window.location.href = permalink;
	    });
	}
    });
}
// CHECK WIDTH OF DOCUMENTS AREA
is_collapsed = null;
function mdocs_check_width() {

    if(jQuery('#mdocs-navbar').width() < 600 && is_collapsed == false || jQuery('#mdocs-navbar').width() < 600 && is_collapsed == null) {
	is_collapsed = true;
	jQuery('#mdocs-nav-expand').remove();
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'nav-collaspse', '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce},function(data) {
	    jQuery('head').append(data);
	});
    } else if(jQuery('#mdocs-navbar').width() > 600 && is_collapsed == true || jQuery('#mdocs-navbar').width() > 600 &&  is_collapsed == null) {
	is_collapsed = false;
	jQuery('#mdocs-nav-collapse').remove();
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'nav-expand', '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	    jQuery('head').append(data);
	});
    }
}
// SHARING MODAL
function mdocs_share_modal() {
    jQuery('.sharing-button').click(function() {
	jQuery('.mdocs-share-body').empty();
	jQuery('.mdocs-share-body').html('<h1>'+mdocs_js.sharing+'</h1>');
	jQuery('.mdocs-share-body').append('<div class="well well-sm"><h3><i class="fas fa-arrow-circle-right" aria-hidden="true"></i> '+mdocs_js.download_page+'</h3><p>'+jQuery(this).data('permalink')+'</p></div>');
	jQuery('.mdocs-share-body').append('<div class="well well-sm"><h3><i class="fa fa-download" aria-hidden="true"></i> '+mdocs_js.direct_download+'</h3><p>'+jQuery(this).data('download')+'</p></div>');
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'show-social', 'doc-id': jQuery(this).data('doc-id'), '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	    jQuery('.mdocs-share-body').append(data);
	    //TWITTER
	    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'https':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='//platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
	    jQuery.getScript('https://platform.twitter.com/widgets.js');
	    //twttr.widgets.load();
	    //GOOGLE +1
	    (function() {
	      var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	      po.src = '//apis.google.com/js/plusone.js';
	      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	    })();
	    //FACEBOOK LIKE
	    window.fbAsyncInit = function() {
		FB.init({ xfbml: true, version: 'v2.4' });
	    };
	    (function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) { return; }
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	    }(document, 'script', 'facebook-jssdk'));
	    FB.XFBML.parse();
	    jQuery('.mdocs-share-body').append('<div id="fb-root"></div>');
	    // LINKEDIN
	    var din ='<script id="holderLink" type="IN/Share" data-url="" data-counter="right"></script>';
	    jQuery(".linkedinDetail").html(din);
	    IN.parse();
	});
    });
}
// VERSION 3.0 JAVASCRIPT PATCH
function mdocs_v3_0_patch(_numfiles) {
	var mdocs_vars = '';
    if (typeof mdocs_js == 'object') mdocs_vars = mdocs_js;
    else mdocs_vars = mdocs_patch_js;

    jQuery.post(mdocs_vars.ajaxurl,{action: 'mdocs_ajax', type: 'mdocs-v3-0-patch', '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	jQuery('body').append(data);
	jQuery('#run-updater-3-0').click(function() {
	    jQuery('.container-3-0').html(''+
		'<div class="btn-container-3-0">'+
		    '<h3>'+mdocs_vars.patch_text_3_0_1+'</h3>'+
		    '<h1><i class="fa fa-spinner fa-pulse fa-3x" aria-hidden="true"></i></h1>'+
		    '<h2>'+mdocs_vars.patch_text_3_0_2+'</h2>'+
		'</div>'
		);
	    jQuery.post(mdocs_vars.ajaxurl,{action: 'mdocs_ajax', type: 'mdocs-v3-0-patch-run-updater', '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
		window.location.href = '';
	    });
	});
	jQuery('#not-now-3-0').click(function() {
	    jQuery.post(mdocs_vars.ajaxurl,{action: 'mdocs_ajax', type: 'mdocs-v3-0-patch-cancel-updater', '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
		jQuery('html, body').css('overflowY', 'auto');
		jQuery('.bg-3-0').remove();
		jQuery('.container-3-0').remove();
	    });
	});
    });
}
// FIND LOST FILES
function mdocs_find_lost_files() {
    jQuery('#mdocs-find-lost-file-start').click(function() {
	jQuery('#mdocs-find-lost-file-start').addClass('disabled');
	jQuery('#mdocs-find-lost-files-results').html('<br><i class="fa fa-sync fa-spin fa-1x fa-fw" aria-hidden="true"></i>');
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'lost-file-search-start', '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	    jQuery('#mdocs-find-lost-file-start').removeClass('disabled');
	    jQuery('#mdocs-find-lost-files-results').html(data);
	    mdocs_find_lost_files_save();
	});
    });
    
}
function mdocs_find_lost_files_save() {
    jQuery('#mdocs-find-lost-files-save').submit(function(event) {
		jQuery('#mdocs-find-lost-files-save-btn').addClass('disabled');
		event.preventDefault();
		var form_data = jQuery(this).serializeArray();
		var values = {};
		for(var i = 0; i < form_data.length; i++) {
			if (!values[form_data[i].name]) values[form_data[i].name] = {}; 
			if (i % 2 == 0) {
				//console.debug(form_data[i]['value']);
				values[form_data[i].name].name = form_data[i].value;
			} else {
				values[form_data[i].name].folder = form_data[i].value;
				//console.debug('odd: '+form_data[i]['value']);
			}
		}
		form_data = JSON.stringify(values);
		jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'lost-file-save', 'form-data': form_data, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
			 jQuery('#mdocs-find-lost-files-results').html(data);
		});
    });
}
// BOX VIEW REFRESH
function mdocs_box_view_refresh() {
    jQuery('.box-view-refresh-button').click(function() {
	var index = jQuery(this).data('index');
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'box-view-refresh', 'id':  jQuery(this).data('id'), 'index': jQuery(this).data('index'), '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	    jQuery('.mdocs-container').append(data);
	    jQuery('#box-view-updated').delay(3000).fadeOut(400, function() { jQuery('#box-view-updated').remove(); });
	});
    });
}
// CLOSE ALL MODALS
function mdocs_modal_close() {
    jQuery('.modal').on('hidden.bs.modal', function () {
		if(jQuery(this).prop('id') == 'mdocs-manage-versions') {
			//window.location.href = '';
		}
		jQuery('.mdocs-modal-body').empty();
    });
}
// MODAL TOGGLE
function mdocs_toggle_modals() {
    jQuery('body').on('click.collapse-next.data-api', '[data-toggle=mdocs-modal]', function(event) {
	event.preventDefault();
	var options = {backdrop: 'static', keyboard: false};
	var target = jQuery(this).data('target');
	jQuery(target).modal(options);
    });
}
// DROPDOWN MENU TOGGLE
function mdocs_toggle_dropdown_menu() {
    var toggle_fix = mdocs_js.dropdown_toggle_fix;
    if (toggle_fix) {
	 jQuery('.mdocs-title-href').focusout(function() {
	    jQuery(this).next().delay(500).fadeOut(100);
	});
	jQuery('.mdocs-title-href').click(function(event) {
	    var mdocs_id = jQuery(this).data('mdocs-id');
	    jQuery('.mdocs-title-href').each(function(each) {
		if(jQuery(this).data('mdocs-id') !=  mdocs_id) jQuery(this).next().fadeOut(100);
	    });
	    event.preventDefault();
	    jQuery(this).focus();
	    jQuery(this).next().fadeIn(100);
	});
    }   
}
// TOGGLE BATCH SELECT ALL
function mdocs_toggle_batch_select_all() {
    jQuery('input[name="mdocs-batch-select-all"]').click(function(event) {
	var checked = jQuery(this).prop('checked');
	jQuery('input[name="mdocs-batch-checkbox"]').each(function(event) {
	   jQuery(this).prop('checked', checked);
	});
	/*
	if(checked) jQuery('.mdocs-batch-options-container').fadeIn();
	else  jQuery('.mdocs-batch-options-container').fadeOut();
	*/
    });
}
// ACTIVATE BATCH OPTIONS
function mdocs_activate_batch_options() {
    jQuery('input[name="mdocs-batch-checkbox"]').click(function(event) {
	var checked = false;
	jQuery('input[name="mdocs-batch-checkbox"]').each(function(event) {
	    if (jQuery(this).prop('checked')) {
		checked = true;
	    }
	});
	/*
	if(checked) jQuery('.mdocs-batch-options-container').fadeIn();
	else  jQuery('.mdocs-batch-options-container').fadeOut();
	*/
    });
}
// BATCH EDIT
function mdocs_batch_edit() {
    var checked = [];
    jQuery('input[name="mdocs-batch-checkbox"]').each(function(event) {
	if (jQuery(this).prop('checked')) {
	    checked.push(jQuery(this).data("id"));
	}
    });
    var serialized_ids = JSON.stringify(checked);
    jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'batch-edit', 'ids': serialized_ids, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	jQuery('.mdocs-batch-edit-body').empty();
	jQuery('.mdocs-batch-edit-body').html(data);
	var doc_data = {};
	doc_data.contributors = null;
	mdocs_contributor_editor(doc_data);
    });
}
function mdocs_batch_edit_save() {
    var data = jQuery('#mdocs-batch-edit-form').serialize();
    jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'batch-edit-save', 'data': data, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
		location.reload();
    });
}
function mdocs_batch_move() {
    var checked = [];
    jQuery('input[name="mdocs-batch-checkbox"]').each(function(event) {
	if (jQuery(this).prop('checked')) {
	    checked.push(jQuery(this).data("id"));
	}
    });
    var serialized_ids = JSON.stringify(checked);
    jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'batch-move', 'ids': serialized_ids, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
		jQuery('.mdocs-batch-move-body').empty();
		jQuery('.mdocs-batch-move-body').html(data);
    });
}
function mdocs_batch_move_save() {
    var data = jQuery('#mdocs-batch-move-form').serialize();
    jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'batch-move-save', 'data': data, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
		location.reload();
    });
}
function mdocs_batch_delete() {
    var checked = [];
    jQuery('input[name="mdocs-batch-checkbox"]').each(function(event) {
	if (jQuery(this).prop('checked')) {
	    checked.push(jQuery(this).data("id"));
	}
    });
    var serialized_ids = JSON.stringify(checked);
     jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'batch-delete', 'ids': serialized_ids, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	jQuery('.mdocs-batch-delete-body').empty();
	jQuery('.mdocs-batch-delete-body').html(data);
    });
}
function mdocs_batch_delete_save() {
    var data = jQuery('#mdocs-batch-delete-form').serialize();
    jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'batch-delete-save', 'data': data, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
	//jQuery('#mdocs-batch-delete-test').html(data);
	location.reload();
    });
}
// MANAGE VERSIONS MODAL
function mdocs_manage_versions() {
    jQuery('.manage-versions-button' ).click(function(event) {
		var sort_type = '';
		var object = jQuery(this).parent().parent().prev();
		if (jQuery(object).data('sort') == jQuery(object).data('current-sort')) {
		if (jQuery(object).data('current-sort-type') == 'desc') sort_type = 'asc';
		else sort_type = 'desc';
		} else sort_type = 'desc';
		if (jQuery(object).data('is-folder') == true){
			sort_type = jQuery(object).data('sort-type');
		}
		var mdocs_id = jQuery(this).data('mdocs-id');
		jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'manage-versions','mdocs-id': mdocs_id, 'folder': jQuery(object).data('folder'), 'sort': jQuery(object).data('sort'), 'sort-type': sort_type,'is-dashboard': jQuery(object).data('is-dashboard'), '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
			jQuery('.mdocs-manage-versions-body').html(data);
		});
    });
}
// VERSIONS MODAL
function mdocs_versions() {
    jQuery('.versions-button' ).click(function(event) {
	//jQuery('.mdocs-ratings-body').empty();
	var mdocs_id = jQuery(this).data('mdocs-id');
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'versions','mdocs-id': mdocs_id, '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
		jQuery('.mdocs-versions-body').html(data);
		//mdocs_submit_rating('large',mdocs_file_id);
	});
    });
}
// UPDATE TO REVISON
function mdocs_update_to_revision() {
	jQuery('#mdocs-update-to-revision-form').submit(function(event) {
		event.preventDefault();
		var object = this;
		var sort_type = '';
		if (jQuery(object).data('sort') == jQuery(object).data('current-sort')) {
		if (jQuery(object).data('current-sort-type') == 'desc') sort_type = 'asc';
		else sort_type = 'desc';
		} else sort_type = 'desc';
		if (jQuery(object).data('is-folder') == true){
			sort_type = jQuery(object).data('sort-type');
		}
		var file = jQuery('input[name="mdocs-update-to-revision-radio"]:checked').data('file');
		var version = jQuery('input[name="mdocs-update-to-revision-radio"]:checked').data('version');
		var mdocs_id = jQuery('input[name="mdocs-update-to-revision-radio"]:checked').data('mdocs-id');
		var current =  jQuery('input[name="mdocs-update-to-revision-radio"]:checked').val();
		jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'update-to-revision', 'current': current,  'file': file, 'version': version, 'mdocs-id': mdocs_id, 'folder': jQuery(object).data('folder'), 'sort': jQuery(object).data('sort'), 'sort-type': sort_type,'is-dashboard': jQuery(object).data('is-dashboard'), '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
			jQuery('.mdocs-manage-versions-body').html(data);
		});
	});
}
// DELETE FILE
function mdocs_delete_file() {
	jQuery('.mdocs-delete-file').click(function(event) {
		event.preventDefault();
		var confirm = window.confirm(mdocs_js.version_file);
		if (confirm) {
			var object = this;
			jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'delete-file', 'mdocs-id': jQuery(this).data('mdocs-id'), '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
				jQuery(object).parent().parent().parent().parent().parent().remove();
				jQuery('.mdocs').append(data);
			});
		}
	});
}
// MDOCS DEBUG
function mdocs_debug_active() {
    if (mdocs_js.mdocs_debug) {
	jQuery('.mdocs-development-warning').html('<div class="alert alert-danger text-center" role="alert" style="clear: both;" >'+mdocs_js.mdocs_debug_text+'</div>');
    }
}
// POST PAGE TITLE FONT SIZE
function mdocs_post_page_title_font_size() {
    if (jQuery('input[name="mdocs-override-post-title-font-size"]').prop('checked') == true) {
	jQuery('#mdocs-post-title-font-size').prop('disabled', false);
    }
    jQuery('input[name="mdocs-override-post-title-font-size"]').change(function() {
	if(jQuery(this).prop('checked') == true) jQuery('#mdocs-post-title-font-size').prop('disabled', false);
	else jQuery('#mdocs-post-title-font-size').prop('disabled', true);
    });
}
// POST PAGE SETTINGS
function mdocs_post_page_settings() {
    jQuery('#mdocs-show-description').change(function() {
	if(jQuery(this).is(':checked') == false) {
	    jQuery('#mdocs-post-content-description').prop('disabled', true);
	    jQuery('#mdocs-post-content-description').prop('selected', false);
	} else jQuery('#mdocs-post-content-description').prop('disabled', false);
    });
    jQuery('#mdocs-show-preview').change(function() {
	if(jQuery(this).is(':checked') == false)  {
	    jQuery('#mdocs-post-content-preview').prop('disabled', true);
	    jQuery('#mdocs-post-content-preview').prop('selected', false);
	} else jQuery('#mdocs-post-content-preview').prop('disabled', false);
    });
    jQuery('#mdocs-show-versions').change(function() {
	if(jQuery(this).is(':checked') == false)  {
	    jQuery('#mdocs-post-content-versions').prop('disabled', true);
	    jQuery('#mdocs-post-content-versions').prop('selected', false);
	} else jQuery('#mdocs-post-content-versions').prop('disabled', false);
    });
}
// MDOCS REFRESH TABLE
function  mdocs_refresh_table() {
	jQuery('.mdocs-sort-option, .mdocs-folders, #mdocs-manage-version-close-btn').click(function(e) {
		e.preventDefault();
		mdocs_table_func(this);
	});
}
function mdocs_table_func(object) {
	var sort_type = '';
	if (jQuery(object).data('sort') == jQuery(object).data('current-sort')) {
		if (jQuery(object).data('current-sort-type') == 'desc') sort_type = 'asc';
		else sort_type = 'desc';
	} else sort_type = 'desc';
	if (jQuery(object).data('is-folder') == true){
		sort_type = jQuery(object).data('sort-type');
	}
	jQuery.post(mdocs_js.ajaxurl,{action: 'mdocs_ajax', type: 'refresh-table', 'folder': jQuery(object).data('folder'), 'sort': jQuery(object).data('sort'), 'sort-type': sort_type,'is-dashboard': jQuery(object).data('is-dashboard'), 'hide-folder': jQuery(object).data('hide-folder'), 'hide-main-folder': jQuery(object).data('hide-main-folder'), '_mdocs_ajax_nonce': mdocs_js.mdocs_ajax_nonce },function(data) {
		if( jQuery(object).data('is-dashboard')) jQuery('.mdocs').replaceWith(data);
		else jQuery(object).closest('.mdocs').replaceWith(data);
		
		if (jQuery(object).data('is-dashboard') == 1) mdocs_admin();
		else mdocs_wp();
	});
}
// FOLDER EDITOR
function mdocs_folder_editor() {
    if(typeof(jQuery.fn.tooltip) == 'function') jQuery('[data-toggle="tooltip"]').tooltip();
}