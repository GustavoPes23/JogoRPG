function toast(tipo, titulo, texto, posicao = 'superior direito', dispensavel = 'sim') {

    var icone = '';
    var cor = '';
    var removeCor = 'text-success text-danger text-warning text-primary';
    var posicaoHTML = '';
    var removePosicao = 'bottom-0 end-0 top-0 end-0 top-50 start-50 translate-middle mt-5';
    var dnone = dispensavel == 'sim' ? 'd-none' : '';
    var autoclose = dispensavel == 'sim' ? '' : 'data-bs-autohide="false"';

    switch (tipo) {
        case 'sucesso':

            icone = 'fa-check-circle';
            cor = 'success';
            break;

        case 'erro':

            icone = 'fa-exclamation-circle';
            cor = 'danger';
            break;

        case 'alerta':

            icone = 'fa-exclamation-triangle';
            cor = 'warning';
            break;

        case 'carregando':

            icone = 'fa-circle-notch fa-spin';
            cor = 'primary';
            break;
    }

    switch (posicao) {
        case 'inferior direito':

            posicaoHTML = 'bottom-0 end-0';
            break;

        case 'superior direito':

            posicaoHTML = 'top-0 end-0 mt-5 me-3';
            break;

        case 'centro':

            posicaoHTML = 'top-50 start-50 translate-middle';
            break;
    }

    if ($('#toastArea').length == 0) {

        $('body').append('<div class="position-fixed p-3 ' + posicaoHTML + '" id="toastArea" style="z-index: 9999"></div>');

    } else {

        $('#toastArea').attr('class', 'position-fixed p-3 ' + posicaoHTML);
    }

    $('#toastArea').append('<div class="toast hide shadow" style="margin-bottom: 0.5rem !important;" role="alert" aria-live="assertive" aria-atomic="true" data-bs-animation="false" ' + autoclose + '><div class="toast-header"><i class="fas ' + icone + ' text-' + cor + ' me-2"></i><strong class="me-auto text-' + cor + '">' + titulo + '</strong><small>agora</small><button type="button" class="btn btn-sm p-0 ' + dnone + '" data-bs-dismiss="toast" aria-label="Close"><i class="fas fa-times ms-2"></i></button></div><div class="toast-body">' + texto + '</div></div>')

    $('#toastArea .toast:last').toast('show');

}