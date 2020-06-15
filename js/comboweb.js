/**************GLOBAL VARIABLES*******************/
var total_container_charges = 0;
var delivery_charges 		= parseFloat($('#ship-delivery-charges').data('delivery-charges'));
var total_cgst      		= 0;
var total_sgst      		= 0;
var order_cart = []; //to store items added to cart
var menu_families = {};
var menu_inventory = {};
/************************************************/

function calculate_year_cost(spanid, multiplyingid, elem){
	$("#" + spanid).html(($(elem).val()*12*$("#" + multiplyingid).val()).toFixed(0));
	sal_month_year();
}

var t = [];var x = 0;var ind;
function validation(id,exp,ind) {
     if ( $(id).val().trim().match(exp) == null)
    {
		if (jQuery.inArray( 1, t ) < 0) {
			
			$(id).tooltip('show');
			t[ind] = 1;
		}
		$(id).css({"border-color": "red"});
		$(id).removeClass('input_valid');
		$(id).addClass('input_invalid');
	}
	else{
		$(id).tooltip('destroy');
		t[ind] = 0;
		$(id).css({"border-color": "#ccc"});
		$(id).removeClass('input_invalid');
		$(id).addClass('input_valid');
	}
}

$('#name').on('change keyup focus focusin focusout',function(e) {
    validation("#name",/^[A-Za-z]{1}[A-Za-z ]+$/,1);
});
$('#email_id').on('change keyup focus focusin focusout',function(e) {
	if(($('#email_id').val()).length==0){
		$('#email_id').tooltip('destroy');
		$('#email_id').css({"border-color": "#FF0000"});
	} else{
		validation("#email_id",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,3);
	}
});
$('#mobile_number').on('autocompletechange keyup focus focusin focusout',function(e) {
	validation("#mobile_number",/^[1-9]{1}[0-9]{9}$/,0);
});
$('#mobile').on('autocompletechange keyup focus focusin focusout',function(e) {
	validation("#mobile",/^[1-9]{1}[0-9]{9}$/,0);
});
$('#city').on('change keyup focus focusin focusout',function(e) {
    validation("#city",/^[A-Za-z]{1}[A-Za-z ]+$/,1);
});
$('#professional_background').on('change keyup focus focusin focusout',function(e) {
    validation("#professional_background",/^[A-Za-z0-9 ,#\\\/\-\.\&\(\)\'\"\:]+$/,2);
});
$('#business_experience').on('change keyup focus focusin focusout',function(e) {
    validation("#business_experience",/^[A-Za-z0-9 ,#\\\/\-\.\&\(\)\'\"\:]+$/,2);
});
$('#food_business').on('change keyup focus focusin focusout',function(e) {
    validation("#food_business",/^[A-Za-z0-9 ,#\\\/\-\.\&\(\)\'\"\:]+$/,2);
});
$('#combo_franchise').on('change keyup focus focusin focusout',function(e) {
    validation("#combo_franchise",/^[A-Za-z0-9 ,#\\\/\-\.\&\(\)\'\"\:]+$/,2);
});
$('#income').on('change keyup focus focusin focusout',function(e) {
    validation("#income",/^[A-Za-z0-9 ,#\\\/\-\.\&\(\)\'\"\:]+$/,2);
});
// $('#line1').on('change keyup focus focusin focusout',function(e) {
//     validation("#line1",/^[A-Za-z0-9 ,#\\\/\-\.\&\(\)\'\"\:]+$/,2);
// });
// $('#line1').on('change keyup focus focusin focusout',function(e) {
//     validation("#line1",/^[A-Za-z0-9 ,#\\\/\-\.\&\(\)\'\"\:]+$/,2);
// });

$(document).ready(function(){
		var reCaptchaWidth = 302;
		if ($('.reference-width').length) {
				var containerWidth = $('.reference-width').innerWidth();
				var x = $('.reference-width').offset().left;
				if(reCaptchaWidth != containerWidth) {
						var captchaScale = containerWidth / reCaptchaWidth;
						$('.g-recaptcha').css({
								'transform':'scaleX('+captchaScale+')',
								'width':reCaptchaWidth - x
						});
						$(".g-recaptcha").offset({ left : x});
				}
		}

        $('.navbar-nav').children().each(function(){
            if($(this).hasClass('active') || $(this).children().attr('href') != window.location.pathname){
                $(this).removeClass('active');
            }

            if($(this).children().attr('href') === window.location.pathname){
                $(this).addClass('active');
            }
        }); 

        $('.franchise-sidebar').children().each(function(){
            if($(this).hasClass('active') || $(this).attr('href') != window.location.pathname){
                $(this).removeClass('active');
            }

            if($(this).attr('href') === window.location.pathname){
                $(this).addClass('active');
                var parents = $(this).parents();
                $(parents[1]).collapse();
            }
        });
})

function sal_month_year(){
	$("#tms").html(
			parseFloat($("#ssqm").val()) +
			parseFloat($("#sscqm").val()) +
			parseFloat($("#saqm").val())
			);
	
	$("#tys").html(
			parseFloat($("#ssm").html()) +
			parseFloat($("#ssc").html()) +
			parseFloat($("#sa").html())
			);
	tot_ops_exp();
}

function cal_othr_year_cost(spanid, elem){
	$("#" + spanid).html($(elem).val()*12);
	othr_year_cost();
}

function othr_year_cost(){
	$("#tmoc").html(
			parseFloat($("#mrc").val()) +
			parseFloat($("#msflc").val()) +
			parseFloat($("#mec").val()) +
			parseFloat($("#mcgc").val()) +
			parseFloat($("#mitc").val()) +
			parseFloat($("#msmc").val()) +
			parseFloat($("#mmc").val())
			);
	
	$("#tyoc").html(
			parseFloat($("#rc").html()) +
			parseFloat($("#sflc").html()) +
			parseFloat($("#ec").html()) +
			parseFloat($("#cgc").html()) +
			parseFloat($("#itc").html()) +
			parseFloat($("#smc").html()) +
			parseFloat($("#mc").html())
			);
	tot_ops_exp();
}

function tot_ops_exp(){
	$("#gtmc").html(
			parseFloat($("#tmoc").html()) +
			parseFloat($("#tms").html())
			);
	
	$("#gtyc").html(
			parseFloat($("#tyoc").html()) +
			parseFloat($("#tys").html())
			);
	
	$("#year1_oe").html($("#gtyc").html());
	$("#year2_oe").html((parseFloat($("#gtyc").html())*1.1).toFixed(0));
	$("#year3_oe").html((parseFloat($("#gtyc").html())*1.21).toFixed(0));
	$("#year4_oe").html((parseFloat($("#gtyc").html())*1.331).toFixed(0));
	$("#year5_oe").html((parseFloat($("#gtyc").html())*1.4641).toFixed(0));
	
	$("#year1_ebitda").html(
		($("#year1_om").html()*	$("#margin").val()/100 - $("#year1_oe").html()).toFixed(0)
		);
	$("#year2_ebitda").html(($("#year2_om").html()*	$("#margin").val()/100 - $("#year2_oe").html() - $("#year1_roy").html()).toFixed(0));
	$("#year3_ebitda").html(($("#year3_om").html()*	$("#margin").val()/100 - $("#year3_oe").html() - $("#year1_roy").html()).toFixed(0));
	$("#year4_ebitda").html(($("#year4_om").html()*	$("#margin").val()/100 - $("#year4_oe").html() - $("#year1_roy").html()).toFixed(0));
	$("#year5_ebitda").html(($("#year5_om").html()*	$("#margin").val()/100 - $("#year5_oe").html() - $("#year1_roy").html()).toFixed(0));
					
}

function cal_projections(elem){
	$pop = $(elem).val();
	$("#year2_hh").html(($pop*1.05).toFixed(0));
	$("#year3_hh").html(($pop*1.1025).toFixed(0));
	$("#year4_hh").html(($pop*1.1576).toFixed(0));
	$("#year5_hh").html(($pop*1.2155).toFixed(0));
	
	$("#year1_pop").html(($pop*4).toFixed(0));
	$("#year2_pop").html(($pop*1.05*4).toFixed(0));
	$("#year3_pop").html(($pop*1.1025*4).toFixed(0));
	$("#year4_pop").html(($pop*1.1576*4).toFixed(0));
	$("#year5_pop").html(($pop*1.2155*4).toFixed(0));
	
	$("#year1_mp").html(($pop*4*.2*48*250).toFixed(0));
	$("#year2_mp").html(($pop*1.05*4*.2*48*250).toFixed(0));
	$("#year3_mp").html(($pop*1.1025*4*.2*48*250).toFixed(0));
	$("#year4_mp").html(($pop*1.1576*4*.2*48*250).toFixed(0));
	$("#year5_mp").html(($pop*1.2155*4*.2*48*250).toFixed(0));

	$("#year1_oms").html(($pop*4*.2*48*250*.35).toFixed(0));
	$("#year2_oms").html(($pop*1.05*4*.2*48*250*.5).toFixed(0));
	$("#year3_oms").html(($pop*1.1025*4*.2*48*250*.5).toFixed(0));
	$("#year4_oms").html(($pop*1.1576*4*.2*48*250*.5).toFixed(0));
	$("#year5_oms").html(($pop*1.2155*4*.2*48*250*.5).toFixed(0));

	$("#year1_om").html(($pop*4*.2*48*250*.35*.1).toFixed(0));
	$("#year2_om").html(($pop*1.05*4*.2*48*250*.35*.15).toFixed(0));
	$("#year3_om").html(($pop*1.1025*4*.2*48*250*.35*.15).toFixed(0));
	$("#year4_om").html(($pop*1.1576*4*.2*48*250*.35*.15).toFixed(0));
	$("#year5_om").html(($pop*1.2155*4*.2*48*250*.35*.15).toFixed(0));

	$("#year1_roy").html(($("#year1_om").html()*.03).toFixed(0));
	$("#year2_roy").html(($("#year2_om").html()*.03).toFixed(0));
	$("#year3_roy").html(($("#year3_om").html()*.03).toFixed(0));
	$("#year4_roy").html(($("#year4_om").html()*.03).toFixed(0));
	$("#year5_roy").html(($("#year5_om").html()*.03).toFixed(0));
	
	$("#year1_mps").html(($pop*4*.2*48*250*.35*.1/12).toFixed(0));
	$("#year2_mps").html(($pop*1.05*4*.2*48*250*.35*.15/12).toFixed(0));
	$("#year3_mps").html(($pop*1.1025*4*.2*48*250*.35*.15/12).toFixed(0));
	$("#year4_mps").html(($pop*1.1576*4*.2*48*250*.35*.15/12).toFixed(0));
	$("#year5_mps").html(($pop*1.2155*4*.2*48*250*.35*.15/12).toFixed(0));
	
	$("#year1_nb").html(($("#year1_mps").html()/$("#year1_atv").html()).toFixed(0));
	$("#year2_nb").html(($("#year2_mps").html()/$("#year2_atv").html()).toFixed(0));
	$("#year3_nb").html(($("#year3_mps").html()/$("#year3_atv").html()).toFixed(0));
	$("#year4_nb").html(($("#year4_mps").html()/$("#year4_atv").html()).toFixed(0));
	$("#year5_nb").html(($("#year5_mps").html()/$("#year5_atv").html()).toFixed(0));

	$("#year1_gsit").html(($("#year1_om").html() * 1.05).toFixed(0));
	$("#year2_gsit").html(($("#year2_om").html() * 1.05).toFixed(0));
	$("#year3_gsit").html(($("#year3_om").html() * 1.05).toFixed(0));
	$("#year4_gsit").html(($("#year4_om").html() * 1.05).toFixed(0));
	$("#year5_gsit").html(($("#year5_om").html() * 1.05).toFixed(0));
	
	$("#year1_nsd").html(($("#year1_gsit").html()/365).toFixed(0));
	$("#year2_nsd").html(($("#year2_gsit").html()/365).toFixed(0));
	$("#year3_nsd").html(($("#year3_gsit").html()/365).toFixed(0));
	$("#year4_nsd").html(($("#year4_gsit").html()/365).toFixed(0));
	$("#year5_nsd").html(($("#year5_gsit").html()/365).toFixed(0));
	
	tot_ops_exp();
}

function fix_margin(elem){
	$("#year1_margin").html($("#margin").val()+"%");
	$("#year2_margin").html($("#margin").val()+"%");
	$("#year3_margin").html($("#margin").val()+"%");
	$("#year4_margin").html($("#margin").val()+"%");
	$("#year5_margin").html($("#margin").val()+"%");
	tot_ops_exp();
}

function prop_eval(){
	var score = 0;
	if( $("#approach").val() == 0 && 
			$("#sign").val() == 0 && $("#vis").val() == 0){
		score = 0;
	}else{
		score = parseFloat($("#approach").val()) + parseFloat($("#tws").val())  +
				parseFloat($("#mark").val()) 	 + parseFloat($("#gf").val())   + parseFloat($("#vis").val())  +
				parseFloat($("#pop").val())      + parseFloat($("#sign").val()) + parseFloat($("#park").val()) +
				parseFloat($("#brand").val())    + parseFloat($("#hub").val());
	}
	if(score < 7){
		$("#result").addClass("bg-danger");
		$("#result").html("<h2>Not a viable property</h2>");
	}else if(score == 7){
		$("#result").addClass("bg-warning");
		$("#result").html("<h2>Average property</h2>");
	}else if(score == 8){
		$("#result").addClass("bg-success");
		$("#result").html("<h2>Good to proceed</h2>");
	}else if(score == 9){
		$("#result").addClass("bg-success");
		$("#result").html("<h2>Very good property</h2>");
	}else if(score == 10){
		$("#result").addClass("bg-success");
		$("#result").html("<h2>Excellent property</h2>");
	}
}

function save_loi(){
	var name = $('#name').val();
	$('#name').hide();
	$('.name').html(name);
	var contact_name = $('#contact_name').val();
	$('#contact_name').hide();
	$('.contact_name').html(contact_name);
	var contact_number = $('#contact_number').val();
	$('#contact_number').hide();
	$('.contact_number').html(contact_number);
	var contact_email = $('#contact_email').val();
	$('#contact_email').hide();
	$('.contact_email').html(contact_email);
	var location = $('#location').val();
	$('#location').hide();
	$('.location').html(location);
	var property = $("input[name='property']:checked").parent('label').text();
	$(".property_radio").hide();
	$('.property').html(property);
	var franchise_type =Array();
	$("input[name='franchise_type']:checked").each(function(i){
		 franchise_type[i] = $(this).val();
	});
	$(".franchise_checkbox").hide();
	$('.franchise_type').html(franchise_type.join("<br>"));
	var reference = $('#reference').val();
	$('#reference').hide();
	$('.reference').html(reference);
	var address = $('#address').val();
	$('#address').hide();
	$('.address').html(address);
	htmlcontent = $("#loi_content").html();
	$('.final_loi').val(htmlcontent);
	$(".contactForm").submit();
}
function recaptchaCallback() {
    $('#franchise_signup').removeAttr('disabled');
};

$('#franchise_signup').on('click', function () {
	var email 	= $('#email').val();
    var mobile 	= $('#mobile').val();
    var mobileno = /^\d{10}$/;
 	var emailid  = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if ((!email.match(emailid)) || (!mobile.match(mobileno))) {
    	$("#signup_login_error_message").hide();
       	$("#signup_login_error_message").hide();
       	$("#signup_login_error_message").show();
        $("#signup_login_error_message").css('color', 'red');
        $("#signup_login_error_message").text("Please enter valid inputs.");
    	return;
    }
    $.ajax({
        url: "/franchise/franchise_signup",
        method : "POST",
        data: {'email' : email,'mobile': mobile},
        success: function(data){
        	var result = JSON.parse(data);
        	if(result['action'] >= 1){
        		window.location = base_url+"self_audit";
        	}else{
        		$('.nav-tabs a:last').tab('show'); 
  				$("#captcha").hide();
  				$("#email_div").hide();
				$("#code_div").show();
				$("#sign_in_mobile").show();
				$("#franchise_signup").hide();
				$("#franchise_login").css('display', 'inline-block');
  				$("#signup_login_error_message").hide();
    			$("#signup_login_error_message").hide();
        		$("#signup_login_error_message").show();
        		$("#signup_login_error_message").css('color', 'red');
        		$("#signup_login_error_message").text(result['message']);
        	}
        }
    });
});

$("#franchise_login").on('click', function(){
	var code = $("#code").val();
	var mobile = $("#sign_in_mobile").val();
	var mobileno = /^\d{10}$/;
 	var codeno   = /^\d{4}$/;
	if ((!code.match(codeno)) || (!mobile.match(mobileno))) {
    	$("#signup_login_error_message").hide();
    	$("#signup_login_error_message").hide();
    	$("#signup_login_error_message").show();
    	$("#signup_login_error_message").css('color', 'red');
    	$("#signup_login_error_message").text("Please enter valid inputs.");
    	return;
    }
	$.ajax({
        url: "/franchise/franchise_login",
        method : "POST",
        data: {'code': code,'mobile': mobile},
        success: function(data){
        	var result = JSON.parse(data);
        	if(result['action']){
        		window.location = base_url+"self_audit";
        	}else{
        		$("#signup_login_error_message").hide();
        		$("#signup_login_error_message").hide();
        		$("#signup_login_error_message").css('color', 'red');
        		$("#signup_login_error_message").show();
        		$("#signup_login_error_message").text(result['message']);
        	}
        }
    });
});

$('#self_audit_form').on('click', function () {
	var form_data = {};
	var name	= 	$('#name').val();
	var email	= 	$('#email').val();
	var mobile 	= 	$('#mobile').val();
	var city 	= 	$('#city').val();
	var submitted_by_agent = 0;
    form_data[$('#professional_background_ques').text()]	=	$('#professional_background').val();
    form_data[$('#business_experience_ques').text()]		=	$('#business_experience').val();
    form_data[$('#food_business_ques').text()]				=	$('#food_business').val();
    form_data[$('#time_for_business_ques').text()]			=	$('#time_for_business option:selected').text();
    form_data[$('#income_ques').text()]						=	$('#income').val();
    form_data[$('#finance_ques').text()]					=	$('#finance option:selected').text();
    form_data[$('#budget_ques').text()]						=	$("#budget option:selected").text();
    form_data[$('#combo_franchise_ques').text()]			=	$('#combo_franchise').val();
    var form_json = JSON.stringify(form_data);
    if(name == '' || city == '' || form_data[$('#professional_background_ques').text()] == '' || form_data[$('#business_experience_ques').text()] == '' || form_data[$('#food_business_ques').text()] == '' || form_data[$('#time_for_business_ques').text()] == '' || form_data[$('#income_ques').text()] == '' || form_data[$('#finance_ques').text()] == '' || form_data[$('#budget_ques').text()] == '' || form_data[$('#combo_franchise_ques').text()] == ''){
		$("#self_audit_message").show();
		$("#self_audit_message").css('color', 'red');
		$("#self_audit_message").text("Please fill all the fields.");
    	return;
    }
    $("#self_audit_message").show();
    $("#self_audit_message").css('color', 'green');
    $("#self_audit_message").text("It might take few seconds.Please wait.");
    $.ajax({
        url: "/franchise/save_self_audit_form",
        method : "POST",
        data: {'name': name,'email': email,'mobile': mobile,'city': city,'submitted_by_agent':submitted_by_agent,'form_data' : form_json},
        success: function(data){
        	var result = JSON.parse(data);
        	if(result['action']){
				window.location.replace(base_url+"franchise/opportunity");
        	}else{
        		$("#self_audit_message").css('color', 'red');
        		$("#self_audit_message").text(result['message']);
        	}
        }
    });
});

$("#authenticate_code").on('click', function(){
	var code = $("#code").val();
	var mobile = $("#mobile_number").val();
	var mobileno = /^\d{10}$/;
 	var codeno   = /^\d{4}$/;
	if ((!code.match(codeno)) || (!mobile.match(mobileno))) {
		$("#authenticate_message").show();
		$("#authenticate_message").css('color', 'red');
		$("#authenticate_message").text("Please enter valid input.");
    	return;
    }
	$.ajax({
        url: "/franchise/validate_code",
        method : "POST",
        data: {'code': code,'mobile': mobile},
        success: function(data){
        	var result = JSON.parse(data);
        	if(result['action']){
        		window.location = base_url+"franchise/opportunity";
        	}else{
        		$("#authenticate_message").show();
        		$("#authenticate_message").css('color', 'red');
        		$("#authenticate_message").text(result['message']);
        	}
        }
    });
});
$(window).ready(function(){
	var list_href = new Array();
	var list_text = new Array();
	var last_segment = window.location.pathname;		
	$('.panel-collapse div a').each(function(i)
	{
		list_href.push($(this).attr('href'));
		list_text.push($(this).text());
	});
	var index = list_href.indexOf(last_segment);	
	if(index-1>=0){
		$('.previous_page').show();
		$('.previous_page').attr('href',list_href[index-1]);
		$('.previous_page').text("\u2190 "+list_text[index-1].charAt(0).toUpperCase()+list_text[index-1].slice(1));
	}
	if(list_href.length>(index+1)){
		$('.next_page').show();
		$('.next_page').attr('href',list_href[index+1]);
		$('.next_page').text(list_text[index+1].charAt(0).toUpperCase()+list_text[index+1].slice(1)+" \u2192");

	}

	if($(window).width() <=991){
		$('#sidebar-toggler').trigger('click');
		$('.scroll_table').addClass('overflow_scroll');
		$('#career-sidebar-toggler').trigger('click');
	}
	      
        if($('.career-panel').hasClass('active')){
            var id = $('.career-panel').attr('id');
            $('#'+id+'_tab').parent().addClass('active');
            $('html, body').animate({
                scrollTop: $('#career-main').offset().top
            }, 'slow');
        }
    
        $("#partydatepicker").datepicker({ 
            autoclose: true, 
            todayHighlight: true,
            startDate: new Date(),
            format:'dd/mm/yyyy',
        }).datepicker('update');
});

function cal_proj_cost(){
	var sosi = $("#store_size").val();
	if(sosi < 200){
		$("#procostspan").html("The store area is too small, outlet is not viable, we require a minimum of 200 Sqft")
	}else if(sosi < 450){
		$("#procostspan").html( "INR " + (sosi*1500) + " *")
	}else {
		$("#procostspan").html( "INR " + (sosi*1200) + " *")
	}  
	$("#procostspan").addClass("bg-danger");
	
	var seats_poss = ((sosi - 150)/15).toFixed(0);
	var staff_poss = 3;
	if(sosi > 899) 
		staff_poss = (sosi - 900)/300 + 3;
	 
		
	$("#seats_poss").html( (seats_poss) + " **");
	$("#staff_poss").html( staff_poss.toFixed(0) + " **");
	$("#seats_poss").addClass("bg-danger");
	$("#staff_poss").addClass("bg-danger");
}

function isNumberKey(evt){
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
	&& (charCode < 48 || charCode > 57))
	return false;
	return true;
}  

function load_map(elem){
	var latlong = ($(elem).data("latlong"));
	var outlet = {lat: parseFloat(latlong.substring(0,latlong.indexOf(","))), 
				 lng: parseFloat(latlong.substring(latlong.indexOf(",") + 1,latlong.length))};
	var map = new google.maps.Map(document.getElementById('outlet_map'), {zoom: 17, center: outlet});
	var marker = new google.maps.Marker({position: outlet, map: map});
}

$('#locateMeIndex').on('click', function(event){
			event.preventDefault();
			$('#searchPlace').addClass('loader');
						if (typeof navigator !== 'undefined' && "geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(function(position) {
						$("#latLong").val(position.coords.latitude+','+position.coords.longitude);
						$("#search").submit();
				}, function(failure) {
					$(".locate-me-error").html("You should allow your browser to locate you.");
				});
			} else {
				//$(".locate-me-error").html("Your browser doesn't support location feature.");
			}
		});

		$('#hlocateMeIndex').on('click', function(event){
			event.preventDefault();
			$('#hsearchPlace').addClass('loader');
						if (typeof navigator !== 'undefined' && "geolocation" in navigator) {
							navigator.geolocation.getCurrentPosition(function(position) {
							$("#hlatLong").val(position.coords.latitude+','+position.coords.longitude);
							$("#hsearch").submit();
				}, function(failure) {
					$(".hlocate-me-error").html("You should allow your browser to locate you.");
				});
			} else {
				//$(".hlocate-me-error").html("Your browser doesn't support location feature.");
			}
		});
		
		var input = document.getElementById('locationInput');
		if(!input) input = document.getElementById('searchPlace');
		if (input) {
			var searchBox = new google.maps.places.SearchBox(input);
			google.maps.event.addListener(searchBox, 'places_changed', function() {
				var places = searchBox.getPlaces();
				if (places.length == 0) {
					return;
				}
				var place_name = String((places[0].formatted_address));
					place_name = place_name.substr(0, place_name.indexOf(','));
					$("#place_name").val(place_name);
				for (var i = 0, place; place = places[i]; i++) {
					var latLong = String((places[0].geometry.location));
					latLong = latLong.substr(1,latLong.indexOf(")")-1);
					$("#latLong").val(latLong);
					$("#search").submit();
				}
			});
		}

		var hinput = document.getElementById('hsearchPlace');
		if (hinput) {
			var hsearchBox = new google.maps.places.SearchBox(hinput);
			google.maps.event.addListener(hsearchBox, 'places_changed', function() {
				var places = hsearchBox.getPlaces();
				if (places.length == 0) {
					return;
				}
				for (var i = 0, place; place = places[i]; i++) {
					var latLong = String((places[0].geometry.location));
					latLong = latLong.substr(1,latLong.indexOf(")")-1);
					$("#hlatLong").val(latLong);
					$("#hsearch").submit();
				}
			});
		}
$( "#city_name" ).change(function() {
		var city_name =$("#city_name").val();
        window.location.href = base_url + city_name;
		});
var markers = [];

function initMap() {
  var uluru;
  var map;
  var resul_map 		= JSON.parse($("#map_marker").val());

  for(var i = 0; i < resul_map.length; i++){
	   uluru       		= {lat: resul_map[i]['lat'], lng:resul_map[i]['lng']};
	   if(i == 0){
		   map 			= new google.maps.Map(document.getElementById('map'), {zoom: 13, center: uluru});
	   }
	   marker 			= new google.maps.Marker({position: uluru, title: resul_map[i]['name']});
	   marker.setMap(map);
	   markers.push(marker);
  }
}

function highlight_mark(index, name){
	var infowindow;
	for(var i = 0; i < markers.length; i++){
		markers[i].setAnimation(null);
	}
	if (markers[index].getAnimation() != google.maps.Animation.BOUNCE) {
		 markers[index].setAnimation(google.maps.Animation.BOUNCE);
		 infowindow = new google.maps.InfoWindow({
	          content: decodeURI(name)
	     });
		 infowindow.open(map, markers[index]);
	} else {
		markers[index].setAnimation(null);
	}
}

$('#sidebar-toggler').click(function(){
	$('.navbarSupportedContent1').toggle();
	if($(window).width() <=991){
		$('.franchise_menu_sidebar').toggleClass('col-xs-1');			
	}      
});

$('#career-sidebar-toggler').on('click',function(){
	$('.careers').toggle();
});

function generate_code(length) {
   var result           = '';
   var characters       = '0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

$('#agent_registration').on('click', function () {
	var agent_details = {};
	agent_details['company_name'] 	= $('#mce-FNAME').val();
	agent_details['address1'] 		= $('#mce-MMERGE2-addr1').val();
	agent_details['address2'] 		= $('#mce-MMERGE2-addr2').val();
	agent_details['city'] 			= $('#mce-MMERGE2-city').val();
	agent_details['state'] 			= $('#mce-MMERGE2-state').val();
	agent_details['country'] 		= $('#mce-MMERGE2-country option:selected').text();
	agent_details['pincode'] 		= $('#mce-MMERGE2-zip').val();
	agent_details['gst'] 			= $('#mce-GSTNUM').val();
	agent_details['owner_name'] 	= $('#mce-OWNER').val();
	agent_details['mobile'] 		= $('#mce-PHONE').val();
	agent_details['email'] 			= $('#mce-EMAIL').val();
	agent_details['rera'] 			= $('#mce-RERA').val();
	agent_details['acc_no'] 		= $('#mce-BANKNUM').val();
	agent_details['bank_name'] 		= $('#mce-BANKNAME').val();
	agent_details['acc_name'] 		= $('#mce-ACNAME').val();
	agent_details['ifsc'] 			= $('#mce-IFSC').val();
	agent_details['reg_by']			= $('#mce-REGISTERED option:selected').text();
	agent_details['verification_code'] = generate_code(4);
	$('#mce-PASSCODE').val(agent_details['verification_code']);
	agent_details['verification_code'] = $('#mce-PASSCODE').val();
    if(agent_details['company_name'] == '' || agent_details['address1'] == '' || agent_details['address2'] == '' ||
    		agent_details['city'] == '' || agent_details['state'] == '' || 
    		agent_details['owner_name'] == '' || agent_details['phone'] == '' || agent_details['email'] == ''){
    	$("#agent_login_message").hide();
       	$("#agent_signup_message").hide();
       	$("#agent_login_validation").show();
        $("#agent_login_validation").css('color', 'red');
        $("#agent_login_validation").text("Please fill all the required fields.");
        event.preventDefault();
        return;
    }else {
	    agent_details = JSON.stringify(agent_details);
	    $.ajax({
	        url: "/agent/agent_registration",
	        method : "POST",
	        data: {'agent_details' : agent_details},
	        success: function(data){
	        	var result = JSON.parse(data);
	        	if(result['action'] == -1){
	  				$("#agent_login_message").hide();
	       			$("#agent_login_validation").hide();
	        		$("#agent_signup_message").show();
	        		$("#agent_signup_message").css('color', 'red');
	        		$("#agent_signup_message").text('You are already registered with us. Please login using mobile and code which would be given to you.');
	        		event.preventDefault();
	        		return;
	        	}else if(result['action'] == 0){
	        		$("#agent_login_message").hide();
	       			$("#agent_signup_message").hide();
	       			$("#agent_login_validation").hide();
	        		$("#agent_system_error_message").show();
	        		$("#agent_system_error_message").css('color', 'red');
	        		$("#agent_system_error_message").text('We are unable to process your request right now.Please try after some time.');
	        		event.preventDefault();
	        		return;
	        	}else{
	        		$('#agent_registration_form').submit();
	        		$("#agentregistration").hide();
	        		$("#agent_login_message").hide();
	       			$("#agent_signup_message").hide();
	       			$("#agent_login_validation").hide();
	  				$("#agentlogin").css('display', 'block');
	        		$("#agent_signup_message").show();
	        		$("#agent_signup_message").css('color', 'green');
	        		$("#agent_signup_message").text('Thank you for your time.One of our Franchise Manager will be getting in touch with you within 48 hours.');
	        	}
	        }
	    });
    }
});

$("#agent_login").on('click', function(){
	var code = $("#code").val();
	var mobile = $("#mobile").val();
 	var mobileno = /^\d{10}$/;
 	var codeno   = /^\d{4}$/;
	if ((!code.match(codeno)) || (!mobile.match(mobileno))) {
		$("#agent_signup_message").hide();
    	$("#agent_login_message").show();
    	$("#agent_login_message").css('color', 'red');
    	$("#agent_login_message").text("Please enter valid inputs.");
    	return;
    }
	$.ajax({
        url: "/agent/agent_login",
        method : "POST",
        data: {'code': code,'mobile': mobile},
        success: function(data){
        	var result = JSON.parse(data);
        	if(result['action']){
        		window.location = base_url+"agent/dashboard";
        	}else{
        		$("#agent_login_message").show();
        		$("#agent_login_message").css('color', 'red');
        		$("#agent_login_message").text(result['message']);
        	}
        }
    });
});

$('#update_agent_details').on('click', function () {
	var agent_details = {};
	agent_details['company_name'] 	= $('#mce-FNAME').val();
	agent_details['address'] 		= $('#mce-MMERGE2-addr1').val();
	agent_details['gst'] 			= $('#mce-GSTNUM').val();
	agent_details['owner_name'] 	= $('#mce-OWNER').val();
	agent_details['mobile'] 		= $('#mce-PHONE').val();
	agent_details['email'] 			= $('#mce-EMAIL').val();
	agent_details['rera'] 			= $('#mce-RERA').val();
	agent_details['acc_no'] 		= $('#mce-BANKNUM').val();
	agent_details['bank_name'] 		= $('#mce-BANKNAME').val();
	agent_details['acc_name'] 		= $('#mce-ACNAME').val();
	agent_details['ifsc'] 			= $('#mce-IFSC').val();
	agent_details['reg_by']			= $('#mce-REGISTERED option:selected').text();
    if(agent_details['company_name'] == '' || agent_details['address'] == '' || agent_details['owner_name'] == '' || agent_details['phone'] == '' || agent_details['email'] == ''){
    	$("#agent_login_message").hide();
       	$("#agent_signup_message").hide();
       	$("#agent_login_validation").show();
        $("#agent_login_validation").css('color', 'red');
        $("#agent_login_validation").text("Please fill all the required fields.");
    	return;
    }
    agent_details = JSON.stringify(agent_details);
    $.ajax({
        url: "/agent/update_agent_details",
        method : "POST",
        data: {'agent_details' : agent_details},
        success: function(data){
        	if(!data == -1){
        		$("#agent_system_error_message").show();
        		$("#agent_system_error_message").css('color', 'red');
        		$("#agent_system_error_message").text('We are unable to update your details right now.Please try after some time.');
        	}else{
        		$("#agent_system_error_message").show();
        		$("#agent_system_error_message").css('color', 'green');
        		$("#agent_system_error_message").text('Your details have been updated successfully.');
        		window.location.reload();
        	}
        }
    });
});

$('#save_franchise_lead_details').on('click', function () {
	var form_data = {};
	$("#empty_fields_error_message").hide();
	$('#name').css('border-color', '');
	$('#email').css('border-color', '');
	$('#mobile').css('border-color', '');
	$('#city').css('border-color', '');
	var name	= 	$('#name').val();
	var email	= 	$('#email').val();
	var mobile 	= 	$('#mobile').val();
	var city 	= 	$('#city').val();
	var status  =   $("#status_div").val();
    form_data['Describe your professional background:']				=	$('#background').val();
    form_data['Funds you plan to set aside for combo franchise:']	=	$("#investment").val();
    var form_json = JSON.stringify(form_data);
    var submitted_by_agent = 1;
    if(name == '' || city == '' || mobile == '' || email == ''){
    	if (name == '')
        	$('#name').css('border-color', 'red');
        if (email == '')
        	$('#email').css('border-color', 'red');
        if (mobile == '')
        	$('#mobile').css('border-color', 'red');
        if (city == '')
        	$('#city').css('border-color', 'red');
		$("#empty_fields_error_message").show();
		$("#empty_fields_error_message").css('color', 'red');
		$("#empty_fields_error_message").text("Please fill all the required fields.");
    	return;
    }
    $.ajax({
        url: "/franchise/save_self_audit_form",
        method : "POST",
        data: {'name': name,'email': email,'mobile': mobile,'city': city,'submitted_by_agent':submitted_by_agent,'form_data' : form_json},
        success: function(data){
        	var result = JSON.parse(data);
        	if(result['action'] == -1){
        		window.location = base_url+"agentregistration";
        	}else if(!result['action']){
        		$("#empty_fields_error_message").show();
        		$("#empty_fields_error_message").css('color', 'red');
        		$("#empty_fields_error_message").text(result['message']);
        	}else{
        		window.location.reload();
        	}
        }
    });
});

function update_franchise_lead_status(franchise_lead_id){
	var status = $("#status_"+franchise_lead_id).val();
	$.ajax({
        url: "/agent/update_franchise_lead_status",
        method : "POST",
        data: {'status': status,'franchise_lead_id': franchise_lead_id},
        success: function(data){
        	if(data){
        		$("#status_update_message_"+franchise_lead_id).show();
        		$("#status_update_message_"+franchise_lead_id).css('color', 'green');
        		$("#status_update_message_"+franchise_lead_id).text('Status updated.');
        		$("#status_update_message_"+franchise_lead_id).delay(3200).fadeOut(300);
        	}else{
        		$("#status_update_message_"+franchise_lead_id).show();
        		$("#status_update_message_"+franchise_lead_id).css('color', 'red');
        		$("#status_update_message_"+franchise_lead_id).text('Status not updated.');
        		$("#status_update_message_"+franchise_lead_id).delay(3200).fadeOut(300);
        	}
        }
    });
}

$("#franchise_agent_logout").on('click', function(){
	$.ajax({
        url: "/agent/franchise_agent_logout",
        method : "POST",
        data: {},
        success: function(data){
        	console.log(data);
        	var result = JSON.parse(data);
        	if(result['action']){
        		window.location = base_url+result['page_redirect'];
        	}else{
        		window.location.reload();
        	}
        }
    });
});

$(document).ready(function(){	
	if(!sessionStorage.getItem('order_options')){
		getLocation();
	}	
});

//get the location of the user
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			showPosition(position);
		}, function(positionError) {
			$(".locate-me-error").html("Location permission needed.");
		});
	} else {
		$(".locate-me-error").html("Location detection not supported in your browser ");
	}
  }
  
  function showPosition(position) {	
	var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode(
		{       
				latLng: latLng     
		},function(responses){			
			if(responses && responses.length > 0) 
			{        
				if(typeof responses[0] !== 'undefined' && typeof responses[0].formatted_address !== 'undefined' && typeof responses[0].address_components !== 'undefined') {						   
					$('#locationInput').val(responses[0].formatted_address);
					$('#latLong').val(position.coords.latitude+','+position.coords.longitude);
				}
				else {
					$(".locate-me-error").html('Unable to get your address.');
				}
			} 
			else {       
				$(".locate-me-error").html('Unable to get your address.');     
			}
		});
}

$(window).on("scroll", function() {
	var documents = $(this).scrollTop();

		if($('.order_online').height() <= documents){
			$(".order_online").addClass("down");		
			$(".topnav").show();
			if ($(window).width() < 767) {
			$('.toggle_order_type_main').css('margin-right','0px');
			}else{
				$('.toggle_order_type_main').css('margin-right','140px');
			}
		}else{
			$('.toggle_order_type_main').css('margin-right','0px');
			$(".order_online").removeClass("down");
			$(".topnav").hide();
			if(!sessionStorage.getItem('order_options'))
				$(".navbar-top").css("position",'relative');
		}
		if(documents >=$('.carousel-inner').offset().top+$('.carousel-inner').height()){
			if($('.scroll-category').css('position')!='fixed'){
				$('.scroll-category').css('position','fixed');				
				$('.scroll-category').css('top',$('.nav_main').height()+21);
			}
			if($('#mySidebar').hasClass('open-cart'))
			$(".scroll-category").css('margin-right', "290px");
		}
		else{
			$('.scroll-category').css('position','');
			$(".scroll-category").css('margin-right', "");
			$('.scroll-category').css('top','');
		}
});

function show_menu() {
		$('.toggle_order_type_main').css('margin-right','0px');
		$(".order_online").removeClass("down");
		$(".navbar-top").css("position",'fixed');
		$(".topnav").hide();
  }


buildTimeList();
function buildTimeList(){
	var now = new Date();
	var order_start_time 	= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30, 0);
	var order_end_time 		= new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 55, 0);
	pickup_start_time =  order_start_time>now?order_start_time:now;
	$('#timeSelector').datetimepicker({
		format: 'hh:ii',
		autoclose: true,
        todayHighlight: true,
		startView: 0,
		startDate: pickup_start_time,
		endDate: order_end_time,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });
}

$('#fetch_menu').click(function(){
	var order_option ={};
	address = $('.location-search').val();
	if(!address){
		$('.time-address-error').text('Please Enter the address');
		return;
	}
	time = moment($('#timeSelector').val(),"H:mm").unix();
	if(!time){
		$('.time-address-error').text('Please select the pickup time');
		return;
	}

	var now = moment();
	if(now.isAfter(moment($('#timeSelector').val(),"H:mm"))){
		$('.time-address-error').text('Please Select Pickup time greater than current time');
		return;
	}
	var order_type= $('.toggle_order_type').data('order_type');
	lat_lng= $('#latLong').val();
	order_option ={'address':address,'time':time,'order_type':order_type,'lat_lng':lat_lng};
	sessionStorage.setItem('order_options',JSON.stringify(order_option));
	$('#get_menu').submit();
});

$('.edit_order_option,.edit_order_type_detail').click(function(){
	$('.order_online').fadeIn();	
	$('.toggle_order_type_nav').fadeOut();
	$('.edit_order_option').attr('style', 'display:none !important');
	$('.header_menu').show();
	$('.navbar-header').css('width','');
	$('.time_error').hide();
	if($(window).width()<767){
		$('.navbar-toggle').show();
		$('.order_online').css('z-index','989');
	}
	$('.scroll-category').css('z-index','988');
});

function close_edit_order(){
	$('.order_online').hide();	
	$('.toggle_order_type_nav').fadeIn();
	$('.edit_order_option').show();
	$('.header_menu').hide();
	$('.navbar-header').css('width','100%');
	$('.time_error').show();
	if($(window).width()<767){
		$('.navbar-toggle').hide();
		$('.order_online').css('z-index','993');
	}
	$('.scroll-category').css('z-index','991');
}

function change_in_navbar(){
	if(sessionStorage.getItem('order_options')){

		var order_options = JSON.parse(sessionStorage.getItem('order_options'));
		$('.delivery_location').text(order_options.address);
		$('#locationInput').val(order_options.address);
		var selected_time = new Date(order_options.time*1000);
		var now  = new Date();
		if(selected_time.getDate()<now.getDate()){ // check for the date stored in session storage
			$('.edit_order_option').trigger('click');
			return;
		}
		$('.order_time').text(moment.unix(order_options.time).calendar());
		$('.order_time').attr('data-deliver_time',order_options.time);
		$('#timeSelector').val(moment.unix(order_options.time).format('H:mm'));
		$('#latLong').val(order_options.lat_lng);

		if($('#ship_json_array').length){
			var ship_json       = JSON.parse($('#ship_json_array').val());
			if(!ship_json.status){
				$('.right-side').css('visibility','hidden');
			} else{
				var categories       = $('#categories').val();
				sessionStorage.setItem('ship_json',JSON.stringify(ship_json));
				sessionStorage.setItem('categories',categories);

				if($('.category_name:last').offset().left < $('.right-side').offset().left)
					$('.right-side').css('visibility','hidden');

				var is_valid_time  = check_business_timing();
				if(!is_valid_time){
					$('.time_error').text('Outlet is non operational at this time, please select a time in between '+moment(ship_json.ship['opening_hour_slots'][0].order_start_time,'hh:mm').format('LT')
				+' to '+moment(ship_json.ship['opening_hour_slots'][0].order_end_time,'hh:mm').format('LT'));
				}
			}
		}
		$('.order_online').hide();
		$('.nav_main').css("position", "fixed");
		$('#header').css('height','82px');
		$('.toggle_order_type_nav,.edit_order_option').css("display", "inline-block");
		$('.header_menu').hide();
		$('.navbar-toggle').hide();
		if($(window).width()>767){
			$('.navbar-header').css('width','100%');
			sessionStorage.setItem('closecart',0);
		} else{
			sessionStorage.setItem('closecart',1);
		}
		var categories   = $('#categories').val();
		if(typeof(categories)!== 'undefined'){
			sessionStorage.setItem('categories',categories);
		}
	var order_type = order_options.order_type;
	$('#order_type').val(order_type);
	switch(order_type){ // 1->Delivery, 2->Take away, 3->Dine in
		case 1: $('#doorNo').show();
				$('#street').show();
				$('#landmark').show();
				$('.cod_payment').show();
				break;
		case 2:	$('#doorNo').hide();
				$('#street').hide();
				$('#landmark').hide();
				$('.cod_payment').hide();
				$('#ship-delivery-charges').attr('data-delivery-charges',0);
				delivery_charges=0;
				break;
		case 3: $('#doorNo').show();
				$('#street').show();
				$('#landmark').show();
				$('.cod_payment').show();
				$('#ship-delivery-charges').attr('data-delivery-charges',0);
				delivery_charges=0;
				break;
		}
	}
	$('body').wrapInner('<div class="shrink_body" />');
	$('.dish_category').hide();
	var cat_id = $('.cat_id').data('cat_id');
	if(!cat_id){
		var cat_id =$(".category_name:first-child").data("category_id");
		var cat_name =$(".category_name:first-child").data("cat_name");
		$('.cat_name').text(cat_name);
		$('.category_'+cat_id).fadeIn('slow');
		$(".category_name:first-child").css('color','orange');
	} else{
		category_offset = $('.category_name_'+cat_id).offset().left;
		$(".content").animate({scrollLeft: category_offset+50},100);
		$('.category_'+cat_id).fadeIn('slow');
		$('.category_name_'+cat_id).css('color','orange');
		$('.left-side').css('visibility','visible');
	}
}

function check_business_timing(){
	var ship_json       = JSON.parse($('#ship_json_array').val());
	var pickup_time 	= moment($('#timeSelector').val(),"h:mm").unix();	
	if(moment(pickup_time).isBetween(moment(ship_json.ship['opening_hour_slots'][0].order_start_time,'hh:mm').unix(),
	   moment(ship_json.ship['opening_hour_slots'][0].order_end_time,'hh:mm').unix(),null,'[]')){
		return true;
	}
	return false;
}

$('.category_name').click(function(){
	$('.dish_category').hide();
	$('.category_name').css('color','initial')
	var cat_id =$(this).data("category_id");
	var cat_name =$(this).data("cat_name");
	$('.category_'+cat_id).fadeIn('slow');
	$('.cat_name').text(cat_name);
	$(this).css('color','orange');
});


function parse_category(){
	if(!sessionStorage.getItem('categories')) return;
	$('.category').hide();
	var categories = JSON.parse(sessionStorage.getItem('categories'));
	for(category in categories){		
		$('.category_id_'+categories[category].category_id).show();
	}
}

function parse_menu(){

	var ship_json       = JSON.parse($('#ship_json_array').val());	
	if(!ship_json) return;
	var inventory_json_arr  = ship_json['menu']['inventory'];
	var families      = ship_json['menu']['families'];
	for(var i=0; i<inventory_json_arr.length; i++ )
	{
		inventory_json_arr[i]['current_inventory'] = parseInt(inventory_json_arr[i]['current_inventory']);
		menu_inventory[inventory_json_arr[i]['id']+'_'+inventory_json_arr[i]['id_type']] = inventory_json_arr[i];
	}

	
	for(var i=0; i<families.length; i++ )
	{
		menu_families[families[i]['family_id']] = families[i];
		if(get_family_inventory(families[i]['family_id']) > 0)
		{			
			$(".cart_add_item_"+families[i]['family_id']).val('Add to cart');
		}
		else
		{	
			$(".cart_add_item_"+families[i]['family_id']).val('No more stock now');
			$(".cart_add_item_"+families[i]['family_id']).prop("disabled",true);
		}
	}
}

function get_family_inventory(id)
{
	var family_json_arr = JSON.parse(menu_families[id]['family_json']);
	var max_family_qty = 0;
	for(var j=0; j < family_json_arr.length; j++){
		if(typeof family_json_arr[j]['is_optional'] !== "undefined" && family_json_arr[j]['is_optional'])
			continue;
		if(family_json_arr[j]['qty'] > get_inventory(family_json_arr[j]['id'], family_json_arr[j]['id_type']))
			return 0;
		if(max_family_qty > 0)
			max_family_qty = Math.min(max_family_qty, parseInt(get_inventory(family_json_arr[j]['id'], family_json_arr[j]['id_type']) / family_json_arr[j]['qty']));
		else
			max_family_qty = parseInt(get_inventory(family_json_arr[j]['id'], family_json_arr[j]['id_type']) / family_json_arr[j]['qty']);
	}

	return max_family_qty;
}

function get_inventory(id, id_type)
{
	if(typeof menu_inventory[id+'_'+id_type] === "undefined") return 0;
	return parseInt(menu_inventory[id+'_'+id_type]['current_inventory']);
}

function update_family(id, increment, qty)
{
	var family_json_arr = JSON.parse(menu_families[id]['family_json']);
	for(var j=0; j < family_json_arr.length; j++){
		if( ! increment && 
			typeof family_json_arr[j]['is_optional'] !== "undefined" && 
			! family_json_arr[j]['is_optional'] &&
			get_inventory(family_json_arr[j]['id'], family_json_arr[j]['id_type']) < (qty * family_json_arr[j]['qty']) )
		{
			return false;
		}
		update_inventory(family_json_arr[j]['id'], family_json_arr[j]['id_type'], increment, (qty * family_json_arr[j]['qty']))
	}
	update_families_inventory();
	return true;
}

function update_inventory(id, id_type, increment, qty)
{
	if(typeof menu_inventory[id+'_'+id_type] !== "undefined")
	{
		if(increment)
			menu_inventory[id+'_'+id_type]['current_inventory']+= qty;
		else
			menu_inventory[id+'_'+id_type]['current_inventory']-= qty;
	}
}

function update_families_inventory()
{
	for(var family_id in menu_families)
	{
		if(get_family_inventory(menu_families[family_id]['family_id']) > 0)
		{
			$(".cart_add_item_"+menu_families[family_id]['family_id']).val('Add to cart');
			$(".cart_add_item_"+menu_families[family_id]['family_id']).prop("disabled",false);
		}
		else
		{
			$(".cart_add_item_"+menu_families[family_id]['family_id']).val('No more stock now');
			$(".cart_add_item_"+menu_families[family_id]['family_id']).prop("disabled",true);			
		}
	}
}

//adding the item to cart
$(document).on('click','.cart_add_item',function(){
	$('.cart_on_empty').hide();
	$('.cart-total').show();
	var item_id = ($(this).data('item-id'));
	var item_dish_name 			= $(this).data('item-dish-name');
	var item_price 				= parseFloat($(this).data('item-price'));
	var item_container_charge 	= parseFloat($(this).data('item-container-charge'));
	var item_cgst 				= parseFloat($(this).data('item-cgst').toFixed(2));
	var item_sgst 				= parseFloat($(this).data('item-sgst').toFixed(2));
	var is_veg 					= $(this).data('is_veg');
	if(get_family_inventory(item_id)>0){
		update_family(item_id,false,1);
	}
	else{
		$(".item-no-stock_"+item_id).fadeIn().delay(1000).fadeOut();
		return;
	}
	var cart_total = parseFloat($('.cart_total').html());
	cart_total = cart_total > 0 ? parseFloat(cart_total - delivery_charges - total_container_charges - total_cgst - total_sgst) : 0.00;
	total_container_charges += item_container_charge;
	total_cgst 	+= item_cgst;	
	total_sgst 	+= item_sgst;
	if(!$('.dish_id_'+item_id).length){
		var item_details = $(".cart_filled").first().clone();
		item_details.addClass('dish_id_'+item_id);
		item_details.find('.family_name_cart').addClass('family_name_cart_'+item_id);
		item_details.find('.family_name_cart_'+item_id).text(item_dish_name);
		item_details.find('.family_price_cart').addClass('family_price_cart_'+item_id);
		item_details.find('.family_price_cart_'+item_id).append(" "+item_price);
		item_details.find('.qtyminus, .qtyplus').attr('data-item-id',item_id);
		item_details.find('.qtyminus,.qtyplus').attr('data-item-price',item_price);
		item_details.find('.qtyminus,.qtyplus').attr('data-item-cgst',item_cgst);
		item_details.find('.qtyminus,.qtyplus').attr('data-item-sgst',item_sgst);
		item_details.find('.qtyminus,.qtyplus').attr('data-item-container-charge',item_container_charge);
		item_details.find('.item-no-stock').addClass('item-no-stock_'+item_id);
		item_details.find('.item-qty').addClass('item-qty_'+item_id);
		if(is_veg)
			item_details.find('.veg_icon').show();
		else
			item_details.find('.nonveg_icon').show();
		item_details.show();
		$(".cart_filled").last().after(item_details.clone().fadeIn());
		$(".cart_filled").last().addClass('cart_filled_'+item_id);
		order_cart[item_id] = {
			qty: 0
		};
	}
	order_cart[item_id].qty++; //Increment the item quantity
	$('.item-qty_'+item_id).val(order_cart[item_id].qty);
	cart_total+=item_price;
	update_cart_total_details(cart_total);
	cart_total = cart_total > 0 ? parseFloat(cart_total + delivery_charges +total_container_charges + total_cgst + total_sgst) : 0.00;
	$('.cart_total').html(parseFloat(cart_total).toFixed(2));
	$('.cart_total').data('cart-details', order_cart);
	item_count = Object.values(order_cart).reduce((total, val) => total + val['qty'], 0);
	$('.item_count_cart').attr('data-count',item_count);
	if(!parseInt(sessionStorage.getItem('closecart')))
		opencart();
});

// decrements the item from cart
    $(document).on('click','.qtyminus',function(){
		event.preventDefault();
		var item_id = $(this).data('item-id');
		var item_price 				= parseFloat($(this).data('item-price'));
		var item_container_charge 	= parseFloat($(this).data('item-container-charge'));
		var item_cgst 				= parseFloat($(this).data('item-cgst').toFixed(2));
		var item_sgst 				= parseFloat($(this).data('item-sgst').toFixed(2));
		order_cart[item_id].qty--; // Decrement the item quantity
			update_family(item_id,true,1);
			$(".cart_add_item_"+item_id).val('Add to cart');
			$(".cart_add_item_"+item_id).prop("disabled",false);
			$('.item-qty_'+item_id).val(order_cart[item_id].qty);
			var cart_total = parseFloat($('.cart_total').html());
			cart_total = cart_total > 0 ? parseFloat(cart_total - delivery_charges -total_container_charges - total_cgst - total_sgst) : 0.00;
			total_container_charges -= item_container_charge;
			total_cgst -= item_cgst;
			total_sgst -= item_sgst;
			cart_total -= item_price;
			update_cart_total_details(cart_total);
			cart_total = cart_total > 0 ? parseFloat(cart_total + delivery_charges + total_container_charges + total_cgst + total_sgst) : 0.00;			
			$('.cart_total').html(parseFloat(cart_total).toFixed(2));
			$('.cart_total').data('cart-details', order_cart);
			
			if(order_cart[item_id].qty<=0){ // if cart value is zero remove from cart
				$('.cart_filled_'+item_id).fadeOut();
				$('.cart_filled_'+item_id).delay(1000).remove();
			}

			item_count = Object.values(order_cart).reduce((total, val) => total + val['qty'], 0);
			$('.item_count_cart').attr('data-count',item_count);
			if($('.cart_filled').length<=1){
				$('.cart-total').fadeOut();
				$('.cart_on_empty').fadeIn();
			}
	});

	function update_cart_total_details(cart_sub_total){
		if (cart_sub_total > 0 && ( total_container_charges > 0 || total_cgst > 0 || total_sgst > 0 ) ) {
				$('.cart_sub_total_row').show();
		}
		else {
				$('.cart_sub_total_row').hide();
		}
		if (total_container_charges > 0) {
				$('.cart_container_charges_row').show();
		}
		else {
				$('.cart_container_charges_row').hide();
		}
		if (cart_sub_total > 0 && delivery_charges > 0) {
				$('.cart_delivery_charges_row').show();
		}
		else {
				$('.cart_delivery_charges_row').hide();
		}
		if (total_cgst > 0) {
			$('.cart_cgst_row').show();
		}
		else {
				$('.cart_cgst_row').hide();
		}
		if (total_sgst > 0) {
			$('.cart_sgst_row').show();
		}
		else {
				$('.cart_sgst_row').hide();
		}
		$('.cart_sub_total').html(parseFloat(cart_sub_total).toFixed(2));
		$('.cart_container_charges').html(parseFloat(total_container_charges).toFixed(2));
		$('.cart_delivery_charges').html(parseFloat(delivery_charges).toFixed(2));
		$('.cart_cgst').html(parseFloat(total_cgst).toFixed(2));
		$('.cart_sgst').html(parseFloat(total_sgst).toFixed(2));
		
}


$('.confirm-order').click(function(){
	var cart_total = parseFloat($('.cart_total').html());
	if (cart_total > 0) { //check for cart amount greater than 0
		closecart();
		$(window).scrollTop(0);
		$('#menu_cart').css("display","none");
		$('#checkout').css("display","block");
		$(".cart_details").not(':first').remove();
		for(key in order_cart ){
			if(order_cart[key].qty){				
				var cart_details = $('.cart_details').first().clone();
				cart_details.find('.checkout_cart_family_name').text(menu_families[key].family_name);
				cart_details.find('.checkout_cart_family_qty').text(order_cart[key].qty+"  X");
				cart_details.find('.checkout_cart_family_price').text(menu_families[key].price);	
				if(menu_families[key].is_veg)
					cart_details.find('.checkout_veg_img').show();
				else
					cart_details.find('.checkout_nonveg_img').show();
				cart_details.css('display','flex');
				$(".cart_details").last().after(cart_details.clone());
			}
		}
		$('.amount_payable').html('');
		var cart_total = $('.cart-total').clone();
		cart_total.find('.confirm-order').remove();
		cart_total.find('.cart_total').addClass('checkout_cart_total');
		cart_total.find('.checkout_cart_total').removeClass('cart_total');
		$('.checkout_cart_total').html(parseFloat($('.cart_total').html()))
		$(".amount_payable").append(cart_total.clone());
		$('#locationInput').attr("disabled", true);
		$('#fetch_menu').css("visibility", "hidden");
		close_edit_order();
	}
});

$('.back_to_menu').click(function(){
		sessionStorage.setItem('closecart',0);
		$('#menu_cart').css("display","block");
		$('#checkout').hide();
		$('.cart_discount_row').hide();
		$('#locationInput').attr("disabled", false);
		$('#fetch_menu').css("visibility", "visible");
		opencart();
		remove_coupon();
		close_edit_order();
});

$('#right-scroll').click(function() {
	event.preventDefault();
	$('.left-side').css('visibility','visible');
	$('#content').animate({
	  scrollLeft: "+=200px"
	}, 350);
 });
 
   $('#left-scroll').click(function() {
	event.preventDefault();
	$('#content').animate({
	  scrollLeft: "-=200px"
	}, 350);
 });


 function opencart() {
	$('#mySidebar').addClass('open-cart');
	$(".shrink_body").css('margin-right', "290px");
	$('.box_shadow').height('380px');
	if($(".scroll-category").css('position')=='fixed')
		$(".scroll-category").css('margin-right', "290px");
  }

  function closecart(){
	$('#mySidebar').removeClass('open-cart');
	$(".shrink_body").css('margin-right', "");
	$(".scroll-category").css('margin-right', "");
	$('.box_shadow').height('');
	sessionStorage.setItem('closecart',1);
}

function togglecart(){
	$('#mySidebar').toggleClass('open-cart');
	if($('#mySidebar').hasClass('open-cart')){
		$('.box_shadow').height('380px');
		$(".shrink_body").css('margin-right', "290px");
		if($(".scroll-category").css('position')=='fixed')
			$(".scroll-category").css('margin-right', "290px");
	}else{
		$('.box_shadow').height('');
		$(".shrink_body").css('margin-right', "");
		$(".scroll-category").css('margin-right', "");
	}
}

$('.go_to_payment_panel').click(function(){
	var is_valid= true;
	$(".billing-input").each(function(index,item) {
		if($(item).hasClass('input_invalid')) {
			is_valid= false;
			$(item).css('border-color','red');		
		}
	});
	$('.go_to_payment_panel').data('user_detail_valid',is_valid);
	if(!is_valid){
		$('.has-error').fadeIn().delay(4000).fadeOut();
		return;
	}
	$('#payment_panel').collapse('show');
	$('#delivery_address_panel').collapse('hide');
});

$(".payment-options-wrap li a").on("click", function(e){
	e.preventDefault();
	$(".payment-options-wrap li a").removeClass("active");
	$(this).addClass("active");
	switch($(this).data("id")){
			case "online-payment":
					$(".payment-options").css("display","none");
					$(".online-payment").css("display","block");
					remove_coupon();
			break;
			case "cod-payment":
					$(".payment-options").css("display","none");
					$(".cod-payment").css("display","block");
					remove_coupon();
			break;
	}
});

$(".apply-coupon-link a").on("click", function(e){
	e.preventDefault();
	switch($(this).attr("class")){
			case "have-coupon":
					$(".payment-coupon-container").css("display","block");
					$(".have-coupon").css("display","none");
					$(".hide-coupon").css("display","block");
			break;
			case "hide-coupon":
					$(".payment-coupon-container").css("display","none");
					$(".hide-coupon").css("display","none");
					$(".have-coupon").css("display","block");
			break;
	}
});

$("#couponApplyCall").on("click", function(event){
	var coupon_code = $('.payment-coupon-value').val().trim();
	if (coupon_code) {
					$('.coupon-status-message').html('');
	}
	else {
			$('.coupon-status-message').html('Please enter coupon code');
			return;
	}
	var postData  = get_postData();
	$('.payment-coupon-value').addClass('loader');
	$("#couponApplyCall").hide();
	$.post("/menu_controller/coupon", postData, 
	function(data, status){
		if (status == 'success') {
			$('.payment-coupon-value').removeClass('loader');
			$("#couponApplyCall").show();
			var json = JSON.parse( data );			
			var coupon_status = json.message;
			var coupon_discount = json.value;
			coupon_use_status = json.status;
			var cart_total = parseFloat($('.cart_total').html());
			if (json.status == true) {
							coupon_discount = (coupon_discount > cart_total) ? cart_total : coupon_discount;
							$('.coupon-status-message').data('status', 1);
							$('.cart_discount_row').show();
							$('.cart_discount').html(parseFloat(coupon_discount).toFixed(2));
							$('.checkout_cart_total').html(parseFloat(eval(cart_total - coupon_discount)).toFixed(2));
			}
			else {
				$('.checkout_cart_total').html(parseFloat(cart_total).toFixed(2));
				$('.cart_discount_row').hide();
				$('.payment-coupon-value').val('');
			}
			$('.coupon-status-message').html(coupon_status);
		}
	});
});

function remove_coupon(){
	$('.payment-coupon-value').removeClass('loader');
	$("#couponApplyCall").show();
	$('.payment-coupon-value').val('');
	$('.coupon-status-message').html('');
	$('.checkout_cart_total').html(parseFloat($('.cart_total').html()));
}

$('.paymentContinue').click(function(){
	var cart_total = parseFloat($('.cart_total').html());
	if(cart_total<=0){
		return;
	}

	var is_valid_time =check_business_timing();
	if(!is_valid_time) {
		$('.time_select_error').text("Outlet is non operational at selected time");
		return;
	}

	var now = moment();
	if(now.isAfter(moment($('#timeSelector').val(),"H:mm"))){
		$('.time_select_error').text('Please select pickup time greater than current time');
		return;
	}
	
	var is_valid = $('.go_to_payment_panel').data('user_detail_valid');
	if(!is_valid){
		$('#delivery_address_panel').collapse('show');
		$('#payment_panel').collapse('hide');
		return;
	}
	
	
	var postData = get_postData();

			$('<form>').attr({
				method: 'POST',
				action: '/menu_controller/checkout',
				id: 'checkout-form',
				name: 'checkout-form'
			}).appendTo('body');
			
			for (var key in postData)
			{
				if (postData.hasOwnProperty(key))
				{
					$('<input>').attr({
						type: 'hidden',
						name: key,
						value: postData[key],
					}).appendTo('form#checkout-form');
				}
			}
			
			$('form#checkout-form').submit();
});

function get_postData(){
	var payment_type = parseInt($(".payment-options-wrap li a.active").data('payment-type'));
	var cart_details_val = $('.cart_total').data('cart-details');
	var final_item = [];
	var final_item_quantity = [];

	for(var key in cart_details_val) {
		if(cart_details_val[key] !== null)
		{
			final_item.push(key);
			final_item_quantity.push(cart_details_val[key].qty);
		}
	}
	var order_time = moment($('#timeSelector').val(),"h:mm").unix();
	
	var order_options = JSON.parse(sessionStorage.getItem('order_options'));
	order_options.time = order_time;
	sessionStorage.setItem('order_options',JSON.stringify(order_options)); //set to the latest selected time

	var coupon_code = $('.payment-coupon-value').val().trim();
	var postData =	{			
		'final_item'                 : final_item.join(),
		'final_item_quantity'        : final_item_quantity.join(),
		'ship_id'                    : $('.cart_total').data('ship-id'),
		'address_line_1'             : $("#doorNo").val().trim() + ", " + $("#street").val().trim()  + " " + " (" + $("#landmark").val().trim() + ")",
		'order_type'				 : $('#order_type').val(),
		'doorNo'                     : $("#doorNo").val().trim(),
		'landmark'                   : $("#landmark").val().trim(),
		'lat_long'                   : $("#latLong").val(),		
		'phone_number'               : $("#mobile").val().trim(),
		'email_id'                   : $("#email_id").val().trim(),
		'customer_name'              : $("#name").val().trim(),
		'cart_ship_data'	         : ($('#ship_json_array').val()),
		'payment_type'               : payment_type,
		'update_cart'                : 0,
		'coupon_code'                : coupon_code,
		'delivery_date_time'		 : order_time
	};
	return postData;
}

function retain_cart() {
	var existing_final_item = $('.cart_total').data('existing-final-item');
	var existing_final_item_quantity = $('.cart_total').data('existing-final-item-quantity');
	var items_array = typeof existing_final_item !== 'undefined' ? existing_final_item.toString().split(',') : [];
	var items_qty_array = typeof existing_final_item_quantity !== 'undefined' ? existing_final_item_quantity.toString().split(',') : [];
	for(var j=0; j<items_array.length; j++){
		items_array[j] =  parseInt(items_array[j]);
		items_qty_array[j] = parseInt(items_qty_array[j]);		
	}

	if (items_array.length) {
		var qty = 0;
		var i = 0;
		var items_count = 0;
		$('.cart_add_item').each(function(){
			var index = -1;
			index = $.inArray(parseInt($(this).data('item-id')), items_array);				
			qty = index > -1 && typeof items_qty_array[index] !== 'undefined' ? items_qty_array[index] : 0;		
			if (qty > 0) {
				items_count++;
			}

			for (i=0; i<qty; i++) {
				$(this).trigger('click');
			}
		});
		$('.confirm-order').trigger('click');
		if (items_count < items_array.length) {
			if (typeof items_array[0] !== 'undefined' && !isNaN(items_array[0])) {
				$('.cart-error').html('Some of the requested dishes are not available. Please add other replacement dishes from the menu.');
			}
		}
	}
	$('.billing-input').each(function(){
		$(this).trigger('keyup');
	});
}

$('.category_select').click(function(e){
	e.preventDefault();
	var ship_json = "";
	var categories = "";
	cat_id  = $(this).data('cat_id');
	if(sessionStorage.getItem('ship_json') && sessionStorage.getItem('categories') ){
		ship_json = sessionStorage.getItem('ship_json');
		categories = sessionStorage.getItem('categories');
	}
	$('<input>').attr({
		type: 'hidden',
		name: 'ship_json',
		value: ship_json,
	}).appendTo('.category_select_'+cat_id);
	$('<input>').attr({
		type: 'hidden',
		name: 'categories',
		value: categories,
	}).appendTo('.category_select_'+cat_id);
	$('.category_select_'+cat_id).submit();
});

$('.pay_donation').click(function(e){
	e.preventDefault();
	var is_valid= true;
	var invalid_id='';
	$('.donation input').each(function(index,item){
		if($(item).hasClass('input_invalid')){
			is_valid= false;
			invalid_id = this.id;
			$(item).css('border-color','red');
			return;
		}
	});
	
	if(!is_valid){
		$('.'+invalid_id+'_has-error').fadeIn().delay(3000).fadeOut();
		return;
	}
	var amount = $('#amount').val();

	if(isNaN(amount) || amount<=0){
		$('.invalid_amount').fadeIn().delay(2000).fadeOut();
		return;
	}
	$('.donation').submit();
});