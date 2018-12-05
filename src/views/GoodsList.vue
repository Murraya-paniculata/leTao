<style>
    .loadMore{
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .sort-up{
        transform: rotate(180deg);
        transition: all .3s ease-out;
    }
    .icon-arrow-short{
        transition: all .3s ease-out;
    }
    .btn:hover{
        background: #ff1516;
        transition: all .3s ease-out;
    }
</style>
<template>
    <div>
        <nav-breadcrumb>
            <span slot="bread">Goods</span>
        </nav-breadcrumb>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a href="javascript:void(0)" class="price" @click="sortGoods">Price
                        <img class="icon-arrow-short" :class="{'sort-up': !sortFlag}" src="../../static/arrow_1199165_easyicon.net.svg" alt="">
                    </a>
                    <a @click="showFilterPop" href="javascript:void(0)" class="filterby stopPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd>
                                <a href="javascript:void(0)" @click="setPriceFilter('all')"
                                   :class="{'cur': priceChecked=='all'}">All</a>
                            </dd>
                            <dd v-for="(price,index) in priceFilter">
                                <a @click="setPriceFilter(index)" href="javascript:void(0)"
                                   :class="{'cur': priceChecked==index}">{{price.startPrice}}
                                    - {{price.endPrice}}</a>
                            </dd>
                        </dl>
                    </div>
                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4 list-warp">
                            <ul>
                                <li v-for="goods in goodsList">
                                    <div class="pic">
                                        <a href="#"><img :src="'/static/'+ goods.productImage" alt=""></a>
                                    </div>
                                    <div class="main">
                                        <div class="name">{{goods.productName}}</div>
                                        <div class="name">{{goods.productImage}}</div>
                                        <div class="price">{{goods.salePrice}}</div>
                                        <div class="btn-area">
                                            <a href="javascript:;" class="btn btn-cart" @click="addCart(goods.productId)">加入购物车</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="loadMore" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                                <img v-show="loading" src="./../assets/loading-spinning-bubbles.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal :mdShow="mdShow" @close="closeModal">
            <p slot="title">tip</p>
            <div slot="message">
                <span v-if="addCartfa">请先登录</span>
                <div v-else>
                    <svg class="icon-status-ok">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
                    </svg>
                    <span>加入購物車成功</span>
                </div>
            </div>
            <div slot="btn-Group">
                <a v-if="addCartfa" class="btn btn--m" @click="mdShow = false">关闭</a>
                <div v-else>
                    <a href="javascript:;" class="btn btn--m"  @click="mdShow = false">继续购物</a>
                    <router-link herf="javascript:;" class="btn btn--m"  to="/cart">查看购物车</router-link>
                </div>
            </div>
        </modal>
        <div class="md-overlay" v-show="overLayFlag" @click="closePop">

        </div>
    </div>
</template>
<script>
    import './../assets/css/base.css'
    import './../assets/css/product.css'
    import navHeader from '../components/header.vue'
    import navFooter from '../components/footer.vue'
    import navBreadcrumb from '../components/breadcrumb.vue'
    import axios from 'axios'
    import modal from '../components/modal.vue'
    export default {
        data() {
            return {
                msg: 'hello vue',
                goodsList: [],
                priceChecked: 'all',
                busy: false,
                loadingMes: '加載中...',
                loadingMesShow: false,
                loading: true,
                priceFilter: [
                    {
                        startPrice: '0.00',
                        endPrice: '100'
                    },
                    {
                        startPrice: '100',
                        endPrice: '500'
                    },
                    {
                        startPrice: '500',
                        endPrice: '1000'
                    },
                    {
                        startPrice: '1000',
                        endPrice: '3000'
                    },
                    {
                        startPrice: '3000',
                        endPrice: '8000'
                    }
                ],
                filterBy: false,
                overLayFlag: false,
                sortFlag: true,
                page: 1,
                pageSize: 8,
                mdShow: false,
                addCartfa: false,
                addCartSuc: false
            }
        },
        components: {
            navHeader,
            navFooter,
            navBreadcrumb,
            modal
        },
        methods: {
            getGoodsList(flag) {
                this.loading = true;
                let params = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sortFlag?1:-1,
                    priceLevel: this.priceChecked
                };
                axios.get("/goods/list",{
                    params: params
                }).then((response) => {
                    this.loading = false;
                    let res = response.data;
                   if(res.status == '0'){
                       console.log(999,res.result);
                       if(flag){
                           this.goodsList = [...this.goodsList,...res.result.list];
                           if(res.result.count === 0){
                               this.busy = true
                               this.loadingMes = '沒有更多數據了';
                               setTimeout(()=>{
                                   this.loadingMesShow = false;
                               })
                           }else{
                               this.busy = false
                           }
                       }else{
                           this.goodsList = res.result.list;
                           this.busy = false;
                       }
                   }else{
                       this.goodsList = [];
                   }
                })
            },
            sortGoods(){
                this.sortFlag = !this.sortFlag;
                this.page =1;
                this.getGoodsList(false);
            },
            loadMore(){
                this.busy = true;
                setTimeout(() => {
                    this.page++;
                    this.getGoodsList(true);
                    this.loadingMesShow = true;
                }, 500);

            },
            showFilterPop() {
                this.filterBy = true;
                this.overLayFlag = true;
            },
            setPriceFilter(index) {
                this.priceChecked = index;
                this.page = 1;
                this.getGoodsList(false);
                this.closePop();
            },
            closePop() {
                this.filterBy = false;
                this.overLayFlag = false;
            },
            addCart(pId){
                axios.post('/goods/addCart',{
                    productId: pId
                }).then((res)=>{
                    this.mdShow = true;
                    if(res.data.status === '0'){
                        this.addCartSuc = true;
                        this.addCartfa = false
                    }else if(res.data.status === '1001'){
                        this.addCartfa = true;
                        this.addCartSuc = fasle;
                    }
                })
            },
            closeModal(){
                this.mdShow = false;
            }
        },
        mounted() {
            this.getGoodsList();
        }
    }
</script>
