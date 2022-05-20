import { Modal } from "./modal.js";

export class Form {
    constructor() {
        this.MODAL = new Modal();

        this.$formId = document.getElementById('form-id');
        this.$formName = document.getElementById('form-name');
        this.$iptId = document.getElementById('ipt_id');
        this.$iptName = document.getElementById('ipt_name');

        this.list = undefined;
    }//constructor

    /// METHOD
    async init(){
        //데이터 불러옴
        await this.get_list();
        //이벤트 준비
        this.on_form_id();
        this.on_form_name();
    }//init()

    async get_list(){
        this.list = await this.fetch_json();
    }//get_list

    fetch_json(){
        return fetch('./data/members.json').then(res=>res.json()).then(json=>json.list);
    }//fetch_json

    /* form submit 이벤트 */
    on_form_id() {
        this.$formId.addEventListener('submit', e => {
            e.preventDefault();
            const val = e.target[0].value.trim();
            if(!val){return;}
            this.check_id(val);
        });
    }//on_form_id

    on_form_name(){
        this.$formName.addEventListener('submit', e => {
            e.preventDefault();
            const val = e.target[0].value.trim();
            if(!val){return;}
            this.check_name(val);
        });
    }//on_form_name

    /* check_id */
    check_id(val){
        const hasId = this.check_data(val, "id");
        if(!hasId){
            const message = `${val}은 존재하지 않는 아이디입니다.`;
            this.MODAL.fail(message);
            this.toggle_ipt_okay(this.$iptId, false);
            this.toggle_ipt_okay(this.$iptName, false);
            this.reset_ipt("id");
            this.reset_ipt("name");
        }else{
            this.reset_ipt("name");
            this.focus_ipt("name");
            this.$formName.classList.remove('off');
            this.toggle_ipt_okay(this.$iptId, true);
            this.$iptName.focus();
        }
    }//check_id

    /* check KR-name */
    check_name(val){
        const result = this.check_data(val, "name");
        if(!result){
            const message = `성함이 일치하지 않습니다.`;
            this.MODAL.fail(message);
            this.toggle_ipt_okay(this.$iptName, false);
            this.reset_ipt("name");
        }else{
            this.toggle_ipt_okay(this.$iptName, true);
            this.MODAL.success(result);
        }
    }//check_name

    reset_ipt(key){
        const $ipt = document.getElementById(`ipt_${key}`);
        $ipt.value = ''; 
    }//reset_ipt

    focus_ipt(key){
        const $ipt = document.getElementById(`ipt_${key}`);
        $ipt.focus();
    }//focus_ipt

    toggle_ipt_okay($ipt,bool){
        $ipt.classList.toggle('okay',bool);
    }//toggle_ipt_okay

    check_data(val, key){
        for(let obj of this.list){
            if(obj[key] == val){
                return obj;}
        }
        return false;
    }//check_data
}//class-Form