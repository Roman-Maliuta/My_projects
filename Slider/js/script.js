function Slider(sliderNew) {
    this.sliderNew = sliderNew;
    this.sliderEl = this.sliderNew.querySelector('.carousel-inner');
    
    let count = 0;
    let slideCurrent = document.querySelector('.slide-current');
    
    this.btnFirst = this.sliderNew.querySelector('.btn-first').addEventListener(
         'click', ()=> {this.firstSlide()}
        ); 
    this.firstSlide = function() {
        if (count !== 0) {
            this.sliderEl.children[0].classList.remove('hide');
            this.sliderEl.children[count].classList.add('hide');
            count = 0; 
            slideCurrent.innerText = (count) + 1; 
        };
    };
    
    this.btnNext = this.sliderNew.querySelector('.btn-next').addEventListener(
         'click', ()=> {this.nextSlide()}
        ); 
    this.nextSlide = function() {
        if (count !== (this.sliderEl.children.length)-1) {
        this.sliderEl.children[count].classList.toggle('hide');
        this.sliderEl.children[count].nextElementSibling.classList.toggle('hide');
        count++;
        slideCurrent.innerText = (count)+1;    
        } else {
            this.firstSlide();  
        }
    };
    
    this.btnLast = this.sliderNew.querySelector('.btn-last').addEventListener(
         'click', ()=> {this.lastSlide()}
        ); 
    this.lastSlide = function() {
        if (count !== (this.sliderEl.children.length)-1) {
        let inLast = (this.sliderEl.children.length)-1;
        this.sliderEl.children[inLast].classList.remove('hide');
        this.sliderEl.children[count].classList.add('hide');
        count = inLast; 
        slideCurrent.innerText = (count)+1;    
        };
    };

    this.btnPrev = this.sliderNew.querySelector('.btn-prev').addEventListener(
         'click', ()=> {this.prevSlide()}
        ); 
    this.prevSlide = function() {
        if (count !== 0) {
        this.sliderEl.children[count].classList.toggle('hide');
        this.sliderEl.children[count].previousElementSibling.classList.toggle('hide');
        count--;
        slideCurrent.innerText = (count)+1;    
        } else {
            this.lastSlide();
        }
    };

    this.inputSlideNum = this.sliderNew.querySelector('.field-slide-num');
    this.btnOpenByNum = this.sliderNew.querySelector('.open-slide-num').addEventListener(
        'click', ()=> {
        if(this.inputSlideNum.value !== '') {
            this.openSlideByIndex(this.inputSlideNum.value);
        }
    });
    this.openSlideByIndex = function(number)  {
        let openValue = (number)-1;
        
        if (Number.isNaN(openValue)) {
            this.inputSlideNum.value = '';
           return; 
        };

        if (openValue > (this.sliderEl.children.length)-1) {
            this. inputSlideNum.value = '';
            return;
        };
    
        if (count === openValue) {
            this.inputSlideNum.value = '';
            return;
        }; 
    
        this.sliderEl.children[openValue].classList.remove('hide');
        this.sliderEl.children[count].classList.add('hide');
        count = openValue;
        slideCurrent.innerText = (count)+1;
        this.inputSlideNum.value = '';
        openValue = 0;
    };

    
    this.inputTitle = this.sliderNew.querySelector('.field-title');
    this.inputDescr = this.sliderNew.querySelector('.field-descritpion');
    this.inputPosition = this.sliderNew.querySelector('.field-position');
    this.btnAddEnd = this.sliderNew.querySelector('.add-end').addEventListener(
        'click', ()=> {
     if(this.inputTitle.value !== '' && this.inputDescr.value !== ''
     && this.inputPosition.value === '') {
        this.addSlide(this.inputTitle.value, this.inputDescr.value);
     }
    });
    this.addSlide = function (title, descr) {
        const div = document.createElement('div');
        div.classList.add('carousel-item');
        div.classList.add('hide');
        
        const pTitle = document.createElement('p');
        pTitle.classList.add('title', 'text');
        pTitle.innerText = `${title}`;
        
        const pDescr = document.createElement('p');
        pDescr.classList.add('descr', 'text');
        pDescr.innerText = `${descr}`;
        
        this.sliderEl.append(div);
        div.append(pTitle, pDescr);

        if((this.sliderEl.children.length)-1 === 0){
            this.sliderEl.children[count].classList.toggle('hide');
        } else { 
            this.sliderEl.children[count].classList.toggle('hide');
            count = 1;
            this.firstSlide();
        };
        this.inputTitle.value = '';
        this.inputDescr.value = '';
    };

    this.inputFile = this.sliderNew.querySelector('.field-image');
    this.labelImg = this.sliderNew.querySelector('.text-label');
    this.pFail = this.sliderNew.querySelector('.message-fail');
    this.btnAddImgEnd = this.sliderNew.querySelector('.add-image');
    this.inputFile.onchange = (e) => {
        if (this.inputFile.files.length >= 1) {
            this.labelImg.innerText = 'Image has been selected';
            this.btnAddImgEnd.disabled = false;
        }
    };
    this.btnAddImgEnd.addEventListener('click', ()=> {
        if (this.inputFile.value !== '' && this.validImage(this.inputFile.files[0].type)) {
            this.addSlideImage(this.inputFile);
        } else {
            this.pFail.classList.remove('hide');
        }
    });
    this.validImage = function (typeValue) {
        let end = typeValue.indexOf('/');
        let type = typeValue.slice(0, end);
        if (type === 'image') {
            return true;
        }
    };
    this.addSlideImage = function (image) {
        let reader = new FileReader();
        reader.readAsDataURL(image.files[0]);
        const div = document.createElement('div');
        div.classList.add('carousel-item');
        div.classList.add('hide');
        
        const sImage = document.createElement('img');
        sImage.classList.add('img');
        reader.onload = function() {
         sImage.src = reader.result;
        };
            
        this.sliderEl.append(div);
        div.append(sImage);

        if((this.sliderEl.children.length)-1 === 0){
            this.sliderEl.children[count].classList.toggle('hide');
        } else { 
            this.sliderEl.children[count].classList.toggle('hide');
            count = 1;
            this.firstSlide();
        };
        this.pFail.classList.add('hide');
        this.inputFile.value = '';
        this.labelImg.innerText = 'Choose a file';
        this.btnAddImgEnd.disabled = true;
    };

    this.btnAddPosition = this.sliderNew.querySelector('.add-position').addEventListener(
        'click', ()=> {
     if(this.inputTitle.value !== '' &&  this.inputDescr.value !== '' 
     &&  this.inputPosition.value !=='' && this.inputFile.value === '') {
        this.textSlide(this.inputTitle.value, 
         this.inputDescr.value, this.inputPosition.value);
    }else if (this.inputFile.value !== ''
         && this.validImage(this.inputFile.files[0].type)
         && this.inputPosition.value !== '') {
         this.imageSlide(this.inputFile, this.inputPosition.value);
     }    
    });
    this.positionCheck = function (selectValue) {       
        if (Number.isNaN(selectValue)) {
            this.inputPosition.value = '';
            this.inputTitle.value = '';
            this.inputDescr.value = '';
            this.inputPosition.value = '';
            return; 
        };

        if (selectValue > (this.sliderEl.children.length) - 1) {
            this.inputPosition.value = '';
            this.inputTitle.value = '';
            this.inputDescr.value = '';
            this.inputPosition.value = '';
            return;
        };
    }

    this.textSlide = function (title, descr, number) {    
        let selectValue = (number)-1;
        this.positionCheck(selectValue);

        if (count !== 0) {
            this.firstSlide();
        }
        
        const div = document.createElement('div');
        div.classList.add('carousel-item');
        div.classList.add('hide');
        
        const pTitle = document.createElement('p');
        pTitle.classList.add('title', 'text');
        pTitle.innerText = `${title}`;
        
        const pDescr = document.createElement('p');
        pDescr.classList.add('descr', 'text');
        pDescr.innerText = `${descr}`;

        this.sliderEl.children[selectValue].before(div);
        div.append(pTitle, pDescr);
       
        if (count === 0) {
            this.sliderEl.children[count].classList.toggle('hide');
            count = 1;
            this.firstSlide();
        }        

        this.inputTitle.value = '';
        this.inputDescr.value = '';
        this.inputPosition.value = '';
    };

    this.imageSlide = function (image, number) {
        let selectValue = (number) - 1;
        this.positionCheck(selectValue);
        let reader = new FileReader();
        reader.readAsDataURL(image.files[0]);
        const div = document.createElement('div');
        div.classList.add('carousel-item');
        div.classList.add('hide');

        if (count !== 0) {
         this.firstSlide();
        }
        
        const sImage = document.createElement('img');
        sImage.classList.add('img');
        reader.onload = function () {
            sImage.src = reader.result;
        };
        this.sliderEl.children[selectValue].before(div);
        div.append(sImage);

        if (count === 0) {
           this.sliderEl.children[count].classList.toggle('hide');
           count = 1;
           this.firstSlide();
        } 
        
        this.inputFile.value = '';
        this.inputPosition.value = '';
        this.labelImg.innerText = 'Choose a file';
        this.btnAddImgEnd.disabled = true;
    };

    this.btnRemoveEnd = this.sliderNew.querySelector('.remove-end').addEventListener(
        'click', ()=> {this.removeLastSlide()});
    this.removeLastSlide = function () {
        let last = (this.sliderEl.children.length)-1;
        if (count === last) {
            this.prevSlide();
        }
        this.sliderEl.children[last].remove();
    };

    this.inputSlideRemove = this.sliderNew.querySelector('.field-remove');
    this.btnRemovePosition = this.sliderNew.querySelector('.remove-position').addEventListener(
        'click', ()=> {
        if(this.inputSlideRemove.value !== '') {
            this.removeSlide(this.inputSlideRemove.value);
        }
    });

    this.removeSlide = function (number) {
        if (count !== 0) {
         this.firstSlide();
        } else if (slideCurrent === number){
            this.nextSlide();
        }
        let removeValue = (number)-1;

        if (Number.isNaN(removeValue)) {
            this.inputSlideRemove.value = '';
            return; 
        };

        if (removeValue > (this.sliderEl.children.length)-1) {
            this.inputSlideRemove.value = '';
            return;
        };

        this.sliderEl.children[removeValue].remove();
           count = 1;
           this.firstSlide();
        this.inputSlideRemove.value = '';
    }
};

const slider = new Slider(document.getElementById('carousel-slider'));