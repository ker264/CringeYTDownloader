let app = new Vue({
    el: '#app',
    data: {
        msg: 'Список ссылок',
        loadMsg: "",
        linkList: []
    },
    async mounted() {
        let id = (new URL(document.location)).searchParams.get("id")
        this.loadMsg = `id: ${id}`
        this.linkList = await (await fetch(`/api/getListById/${id}`)).json()
        this.msg = 'Список посылок';                       
    },
    methods: {
        async cas(){
            this.linkList[0].name = "dog";
            console.log("bark");
        }
    },
})