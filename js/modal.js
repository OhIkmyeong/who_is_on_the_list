export class Modal{
    constructor(){
        this.$wrap = document.getElementById('modal-wrap');
        this.$bg = document.getElementById('modal-bg');
        this.$modal = document.getElementById('modal');
        this.OFF = "off";

        //배경 클릭시 모달 닫힘
        this.$bg.addEventListener('click',()=>{
            this.show_modal(false);
        });
    }//constructor

    fail(message){
        this.$modal.classList.add('fail');
        this.change_message(message);
        this.show_modal(true);
    }//fail

    success(result){
        this.reset();
        const {id,name} = result;
        const name_f = name.charAt(0);
        const name_l = name.charAt(name.length - 1);
        const name_res = name_f.padEnd(name.length - 1, "*") + name_l;
        const message = `<strong>${id} (${name_res})</strong>은/는 리스트에 존재합니다.`;
        this.change_message(message);
        this.show_modal(true);
    }//success

    change_message(message){this.$modal.innerHTML = message;}

    /*  */
    reset(){
        this.$modal.classList.remove('fail');
        this.$modal.textContent = '';
    }//reset
    
    show_modal(bool){
        this.$wrap.classList.toggle(this.OFF,!bool);
    }//show_modal
}//Modal