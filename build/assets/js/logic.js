$(document).ready(function () {
    console.log('jquery loaded');
    $('ul.tabs').tabs();    
    $('.modal').modal();
    $('#modal1').modal('open');    
});