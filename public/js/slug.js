document.addEventListener('DOMContentLoaded', slugHandler);
document.addEventListener('turbo:load', slugHandler);

function slugHandler(event) {
    // define init data
    var slugInput = document.querySelector('.form-control.slug-input');
    let sluggableInputs = document.querySelectorAll('.form-control.sluggable-input');
    var isSlugEditable = false;
    if (!slugInput || sluggableInputs.length <= 0 || document.querySelector('.slug-hidden')) {
        return;
    }
    if (slugInput.value === '' || slugInput.value === undefined) {
        isSlugEditable = true;
    }
    document.querySelectorAll('button.btn.sluggable-modal').forEach(item => {
        item.addEventListener('click', function () {
            setTimeout(slugHandler, 500);
        });
    });
    // render second input cos 'disabled' input dont send in POST request
    let field = document.createElement('input');
    field.setAttribute('type', 'hidden');
    field.setAttribute('class', 'slug-hidden');
    field.setAttribute('name', slugInput.getAttribute('name'));
    field.setAttribute('value', slugInput.value);
    slugInput.addEventListener('change', function (e) {
        field.value = slugInput.value;
    });
    slugInput.parentNode.insertBefore(field, slugInput.nextSibling);
    // create "clear" button & logic, push them after input
    let clearButton = document.createElement('span');
    clearButton.innerText = 'Clear slug';
    clearButton.classList.add('btn');
    clearButton.addEventListener('click', function () {
        slugInput.value = '';
        isSlugEditable = true;
        field.value = slugInput.value;
    });
    slugInput.parentNode.insertBefore(clearButton, slugInput.nextSibling);
    // slug generator logic
    if (sluggableInputs.length > 0) {
        sluggableInputs.forEach(item => {
            // on input if allow - edit slug value
            item.addEventListener('input', function () {
                if (isSlugEditable) {
                    slugGenerator(item.value, slugInput);
                }
                field.value = slugInput.value;
            });
            // on focus over - deny editing slug value if not empty
            item.addEventListener('blur', function () {
                if (slugInput.value !== '' && slugInput.value !== undefined) {
                    isSlugEditable = false;
                }
            });
        });
    }
}

function slugGenerator(string, input) {
    let delimiter = '-';
    let abc={'ß':'ss','à':'a','á':'a','â':'a','ã':'a','ä':'a','å':'a','æ':'ae','ç':'c','è':'e','é':'e','ê':'e','ë':'e','ì':'i','í':'i','î':'i','ï':'i','ð':'d','ñ':'n','ò':'o','ó':'o','ô':'o','õ':'o','ö':'o','ő':'o','ø':'o','ù':'u','ú':'u','û':'u','ü':'u','ű':'u','ý':'y','þ':'th','ÿ':'y','α':'a','β':'b','γ':'g','δ':'d','ε':'e','ζ':'z','η':'h','θ':'8','ι':'i','κ':'k','λ':'l','μ':'m','ν':'n','ξ':'3','ο':'o','π':'p','ρ':'r','σ':'s','τ':'t','υ':'y','φ':'f','χ':'x','ψ':'ps','ω':'w','ά':'a','έ':'e','ί':'i','ό':'o','ύ':'y','ή':'h','ώ':'w','ς':'s','ϊ':'i','ΰ':'y','ϋ':'y','ΐ':'i','ş':'s','ı':'i','ç':'c','ü':'u','ö':'o','ğ':'g','а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'j','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'sh','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya','є':'ye','і':'i','ї':'yi','ґ':'g','č':'c','ď':'d','ě':'e','ň':'n','ř':'r','š':'s','ť':'t','ů':'u','ž':'z','ą':'a','ć':'c','ę':'e','ł':'l','ń':'n','ó':'o','ś':'s','ź':'z','ż':'z','ā':'a','č':'c','ē':'e','ģ':'g','ī':'i','ķ':'k','ļ':'l','ņ':'n','š':'s','ū':'u','ž':'z','ө':'o','ң':'n','ү':'u','ә':'a','ғ':'g','қ':'q','ұ':'u','ა':'a','ბ':'b','გ':'g','დ':'d','ე':'e','ვ':'v','ზ':'z','თ':'th','ი':'i','კ':'k','ლ':'l','მ':'m','ნ':'n','ო':'o','პ':'p','ჟ':'zh','რ':'r','ს':'s','ტ':'t','უ':'u','ფ':'ph','ქ':'q','ღ':'gh','ყ':'qh','შ':'sh','ჩ':'ch','ც':'ts','ძ':'dz','წ':'ts','ჭ':'tch','ხ':'kh','ჯ':'j','ჰ':'h'};
    string = string.toLowerCase();
    for (var k in abc) {
        string = string.replace(RegExp(k, 'g'), abc[k]);
    }
    var alnum = (typeof(XRegExp) === 'undefined') ? RegExp('[^a-z0-9]+', 'ig') : XRegExp('[^\\p{L}\\p{N}]+', 'ig');
    string = string.replace(alnum, delimiter);
    string = string.replace(RegExp('[' + delimiter + ']{2,}', 'g'), delimiter);
    string = string.replace(RegExp('^' + delimiter + '|' + delimiter + '$', 'g'), '');
    input.value = string;
}
