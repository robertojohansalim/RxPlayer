var currSliderIdx = 0;
var isPause = false;
var pauseTimer = 0;

var imageSliderWidth = 0; 

/*
 * Resizing Image Slider 
 */
window.onresize = resizeFunction;

function resizeFunction() {
    console.log($(document).width());
    var width = $('.image-frame').width()

    if(width == imageSliderWidth) return

    // Getting the width of the frame containing image
    imageSliderWidth = $('.image-frame').width()

    // Ajusting the width of the Images 
    $('.image-slider-wrapper img').css('width', imageSliderWidth + "px")    
    
    // Ajusting the left (slider part) of the image slider (Repositioning)
    $('.image-slider-wrapper').css('left', "-" + imageSliderWidth*currSliderIdx +"px");



    // Resizing Frame
    // console.log("Height" + $('.image-slider-wrapper img').height())
    var height = $('.image-slider-wrapper img').height()
    $('.image-frame').css('height', height +"px");
}


/*
 * Bellow is Triggered when  
 */
$(document).ready(function(){
    console.log("jQuerry Exist")
    imageSliderWidth = $('.image-slider-wrapper img').css('width')
    imageSliderWidth = imageSliderWidth.match(/\d+/)[0]
    // or
    // imageSliderWidth = imageSliderWidth.replace("px","")
    
    console.log($('.image-slider-wrapper img').css('width'))
    
    // Resizing if fired under un-natural condition
    resizeFunction()

    // Setting up Slider Index Button
    $('.slider-idx').on("click", function(){
        var idxTo = $('.slider-idx').index($(this))
        slideSliderTo(idxTo);
        pauseTimer = 1;
    });

    // Setting up Pause on Hover
    $('.image-frame').hover(
        function(){
            isPause = true;
        },
        function(){
            isPause = false;
        }
    );

    //Setting up Slider interval
    setInterval(slideNext,4000)

})

function slideSliderTo(idxTo){
    var stringTo = "-" + (idxTo * imageSliderWidth) + "px";
    $('.image-slider-wrapper').animate({left: stringTo});

    $('.slider-idx').eq(currSliderIdx).removeClass('active-sidx')

    //Update Global Variable
    currSliderIdx = idxTo;

    $('.slider-idx').eq(currSliderIdx ).addClass('active-sidx')
}

function slideNext(){
    if(isPause) return;
    if(pauseTimer > 0){
        pauseTimer--;
        return;
    }
    var idxTo = currSliderIdx + 1;
    if ($('.image-slider-wrapper img').eq(idxTo).length === 0){
        idxTo = 0;
    }

    slideSliderTo(idxTo)
}

function slidePrev(){
    if(isPause) return;
    if(pauseTimer > 0){
        pauseTimer--;
        return;
    }
    console.log($('.image-slider-wrapper img').length)
    var idxTo = currSliderIdx - 1;
    if (idxTo < 0){
        idxTo = $('.image-slider-wrapper img').length - 1;
    }

    slideSliderTo(idxTo)
}