import{_ as C,o as e,c as d,e as p,T as m,F as h,d as t,f as T,g as _,L as O,m as b,h as f,M,r as v,i as N,j as r,a as V,t as n,n as y,b as l}from"./index-FeLLQDu8.js";import{c as P}from"./cartStore-pSg0m_fv.js";const D={props:["activedBtn"]},E=t("span",{class:"spinner-border spinner-border-sm",role:"status"},null,-1),F=t("span",{class:"spinner-border spinner-border-sm",role:"status"},null,-1);function U(s,i,c,L,u,g){return e(),d(h,null,[(e(),p(m,{to:`#showDetailBtn${c.activedBtn}`},[E],8,["to"])),(e(),p(m,{to:`#addToCartBtn${c.activedBtn}`},[F],8,["to"]))],64)}const j=C(D,[["render",U]]),$="https://ec-course-api.hexschool.io/v2",S="2023-vue",B=T("productsStore",{state:()=>({products:[],singleProduct:{},isLoading:!1,loadingContainer:{}}),getters:{isOnSale(){return this.singleProduct.origin_price>this.singleProduct.price},isOnSaleArr(){return this.products.map(s=>s.origin_price>s.price)}},actions:{getAllProducrs(){_.get(`${$}/api/${S}/products/all`).then(s=>{this.products=s.data.products}).catch(s=>{alert(`無法取得商品資料：${s.response.data.message}`)})},getSingleProduct(s){this.isLoading=!0,_.get(`${$}/api/${S}/product/${s}`).then(i=>{this.singleProduct=i.data.product,this.isLoading=!1}).catch(i=>{alert(`無法取得該商品資料：${i.response.data.message}`),this.isLoading=!1})}}}),z={components:{Loading:O,ProductBtnsLoading:j},data(){return{modal:null,activedBtn:null}},methods:{...b(B,["getAllProducrs","getSingleProduct"]),...b(P,["addToCart"])},computed:{...f(B,["products","singleProduct","isLoading","isOnSale","isOnSaleArr","loadingContainer"]),...f(P,["isAddingToCart"]),modalPorductNum(){return Number.parseInt(this.$refs.productModalinput.value,10)}},mounted(){this.getAllProducrs(),this.modal=new M(this.$refs.productModal),this.$refs.productModal.addEventListener("shown.bs.modal",()=>{this.$refs.productModalinput.value=1})},unmounted(){this.modal.dispose()}},I={class:"container"},q={class:"table text-center"},G=t("thead",null,[t("tr",null,[t("th",{scope:"col"},"產品預覽"),t("th",{scope:"col"},"產品名稱"),t("th",{scope:"col",class:"text-end"},"價格"),t("th",{scope:"col",width:"200"})])],-1),H={scope:"row"},J=["src","alt"],K={class:"fs-6"},Q=["onClick","disabled","id"],R={class:"text-end"},W={key:0,class:"mb-0"},X={class:"text-danger fw-bold"},Y=["onClick","disabled","id"],Z={ref:"productModal",class:"modal fade",id:"productModal",tabindex:"-1","aria-labelledby":"productModalLabel","aria-hidden":"true"},x={class:"modal-dialog"},tt={class:"modal-content vl-parent"},st={class:"modal-header py-2 bg-info bg-opacity-50"},et={class:"modal-title fw-bold"},ot={class:"modal-body vl-hide"},nt={class:"container-fluid"},at={class:"row"},it={class:"col"},dt=["src","alt"],lt={class:"col d-flex flex-column py-2"},rt={class:"badge rounded-pill bg-primary align-self-start"},ct={class:"mt-3"},ut={class:"text-end mt-auto"},pt={key:0,class:"mb-0"},ht={class:"text-danger fw-bold"},gt={class:"modal-footer"},mt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 關閉 ",-1),_t={class:"input-group",style:{width:"40%"}},bt={type:"number",min:"1",value:"1",class:"form-control",ref:"productModalinput"},ft={key:0,class:"spinner-border spinner-border-sm",role:"status"};function vt(s,i,c,L,u,g){const A=v("ProductBtnsLoading"),w=v("Loading");return e(),d(h,null,[t("div",I,[t("table",q,[G,t("tbody",null,[(e(!0),d(h,null,N(s.products,(o,a)=>(e(),d("tr",{key:o.id,class:"align-middle"},[t("th",H,[t("img",{src:o.imageUrl,alt:o.title,style:{height:"180px",width:"180px"},class:"img-fluid"},null,8,J)]),t("td",null,[t("h3",K,n(o.title),1),t("button",{type:"button",class:"btn btn-outline-info btn-sm","data-bs-toggle":"modal","data-bs-target":"#productModal",onClick:k=>(s.getSingleProduct(o.id),this.activedBtn=a),disabled:s.isLoading||s.isAddingToCart,id:`showDetailBtn${a}`}," 產品資訊 ",8,Q)]),t("td",R,[t("p",{class:y(["mb-0",{"text-secondary":s.isOnSaleArr[a],"text-decoration-line-through":s.isOnSaleArr[a],small:s.isOnSaleArr[a]}])}," 定價 "+n(o.origin_price)+" 元 ",3),s.isOnSaleArr[a]?(e(),d("p",W,[l(" 現在只要 "),t("span",X,n(o.price),1),l(" 元 ")])):r("",!0)]),t("td",null,[t("button",{onClick:k=>(s.addToCart(o.id),this.activedBtn=a),type:"button",class:"btn btn-primary btn-sm",disabled:s.isLoading||s.isAddingToCart,id:`addToCartBtn${a}`}," 加入購物車 ",8,Y)])]))),128))]),s.isLoading||s.isAddingToCart?(e(),p(A,{key:0,activedBtn:u.activedBtn},null,8,["activedBtn"])):r("",!0)])]),t("div",Z,[t("div",x,[V(w,{active:s.isLoading,"is-full-page":!1},null,8,["active"]),t("div",tt,[t("div",st,[t("h5",et,n(s.singleProduct.title),1)]),t("div",ot,[t("div",nt,[t("div",at,[t("div",it,[t("img",{src:s.singleProduct.imageUrl,alt:s.singleProduct.title,class:"img-fluid w-100",style:{height:"240px"}},null,8,dt)]),t("div",lt,[t("span",rt,n(s.singleProduct.category),1),t("p",ct,n(s.singleProduct.description),1),t("p",null,n(s.singleProduct.content),1),t("div",ut,[t("p",{class:y(["mb-1",{"text-secondary":s.isOnSale,"text-decoration-line-through":s.isOnSale,small:s.isOnSale}])}," 定價 "+n(s.singleProduct.origin_price)+" 元 ",3),s.isOnSale?(e(),d("p",pt,[l(" 現在只要 "),t("span",ht,n(s.singleProduct.price),1),l(" 元 ")])):r("",!0)])])])])]),t("div",gt,[mt,t("div",_t,[t("input",bt,null,512),t("button",{onClick:i[0]||(i[0]=o=>s.addToCart(s.singleProduct.id,g.modalPorductNum,u.modal)),class:"btn btn-primary",type:"button"},[l(" 加入購物車 "),s.isAddingToCart?(e(),d("span",ft)):r("",!0)])])])])])],512)],64)}const $t=C(z,[["render",vt]]);export{$t as default};
