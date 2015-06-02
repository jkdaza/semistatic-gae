var SemiStatic = {
		//allowedContent: 'p span[*]; strong; i; a[!href]; p(text-center)',
		allowedContent: {
		    'p span': {
		        styles: 'text-align'
		    },
		    
		    a: {
		        attributes: '!href'
		    },
		    'strong em': true,
		    p: {
		        classes: 'text-center'
		    },
		    'ul' : true,
		    'li' : true
		},
		endpoint : '/saveitem',
		preProcess : null
};

jQuery( document ).ready(function( $ ) {
	CKEDITOR.disableAutoInline = true;
	
    $(".editable[contenteditable='true']" ).each(function( index ) {
    	var editable_block = $(this);
        var content_id = editable_block.attr('id');
       
        var ed = CKEDITOR.inline( content_id, {
        	allowedContent: SemiStatic.allowedContent,
            on: {
                blur: function( event ) {
                	var key = editable_block.data('key') || null;
                    var data = event.editor.getData();
                    if (typeof SemiStatic.preProcess == 'function') {
                    	data = SemiStatic.preProcess(data);
                    }
                    var request = $.ajax({
                        url: SemiStatic.endpoint,
                        type: "POST",
                        data: {
                            content : data,
                            item_name : content_id,
                            key	:	key,
                            page_id	: $('body').data('pageid')
                        },
                        dataType: "json",
                        success: function(data) {
                        	if ('error' in data && data.error) {
                        		alert(data.error);
                        		location.reload();
                        	} else if ('key' in data && data.key) {
                        		//console.log(editable_block.data('key'))
                        		editable_block.attr('data-key',data.key);
                        		//console.log(editable_block.data('key'))
                        	}
                        }
                    });
                }
            }
        });
        /*ed.on( 'instanceReady', function() {
            console.log( ed.filter.allowedContent );
        } );*/
    });

});