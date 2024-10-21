function generarAbecedario() {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
}

function generarMatrizVigenere() {
    const abecedario = generarAbecedario();
    const matriz = [];
    for (let i = 0; i < abecedario.length; i++) {
        matriz.push([...abecedario.slice(i), ...abecedario.slice(0, i)]);
    }
    return matriz;
}

function mostrarMatrizVigenere() {
    const matriz = generarMatrizVigenere();
    const matrizDiv = document.getElementById('matriz-vigenere');
    let tablaHtml = '<table><tr><th></th>';

    const abecedario = generarAbecedario();
    abecedario.forEach(letra => {
        tablaHtml += `<th>${letra}</th>`;
    });
    tablaHtml += '</tr>';

    matriz.forEach((fila, i) => {
        tablaHtml += `<tr><th>${abecedario[i]}</th>`;
        fila.forEach(letra => {
            tablaHtml += `<td>${letra}</td>`;
        });
        tablaHtml += '</tr>';
    });
    tablaHtml += '</table>';
    matrizDiv.innerHTML = tablaHtml;
}

function cifrarVigenere(mensaje, clave) {
    const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    mensaje = mensaje.replace(/[^A-Z]/g, '');
    clave = clave.replace(/[^A-Z]/g, '').toUpperCase();
    
    let resultado = '';
    for (let i = 0, j = 0; i < mensaje.length; i++) {
        const letra = mensaje[i];
        const posMensaje = abecedario.indexOf(letra);
        const posClave = abecedario.indexOf(clave[j % clave.length]);
        resultado += abecedario[(posMensaje + posClave) % abecedario.length];
        j++;
    }
    return resultado;
}

function descifrarVigenere(mensaje, clave) {
    const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    mensaje = mensaje.replace(/[^A-Z]/g, '');
    clave = clave.replace(/[^A-Z]/g, '').toUpperCase();

    let resultado = '';
    for (let i = 0, j = 0; i < mensaje.length; i++) {
        const letra = mensaje[i];
        const posMensaje = abecedario.indexOf(letra);
        const posClave = abecedario.indexOf(clave[j % clave.length]);
        resultado += abecedario[(posMensaje - posClave + abecedario.length) % abecedario.length];
        j++;
    }
    return resultado;
}

mostrarMatrizVigenere();

document.getElementById('cifrar-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const mensaje = document.getElementById('mensaje-cifrar').value.toUpperCase();
    const clave = document.getElementById('clave-cifrar').value;

    const resultado = cifrarVigenere(mensaje, clave);
    document.getElementById('resultado-cifrado').innerText = resultado;
});

document.getElementById('descifrar-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const mensaje = document.getElementById('mensaje-descifrar').value.toUpperCase();
    const clave = document.getElementById('clave-descifrar').value;

    const resultado = descifrarVigenere(mensaje, clave);
    document.getElementById('resultado-descifrado').innerText = resultado;
});
