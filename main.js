/**
 * Created by momchillgorchev on 29/05/15.
 */


var model = {

    init: function(){
        this.catList = [
            {
                'name': 'Boomer',
                'score': 0,
                'imgUrl': 'http://dreamatico.com/data_images/cat/cat-8.jpg'
            },
            {
                'name': 'Moshi',
                'score': 0,
                'imgUrl': 'http://www.hdwallpaperscool.com/wp-content/uploads/2013/11/Cute-cat-top-pictures-desktop-wallpapers-full.jpg'
            }
        ];
    },

    getCatList: function(){
        return this.catList;
    },

    updateCatScore: function(catName){
        var cats = model.getCatList();
        for(var i = 0; i < cats.length; i++){
            if(cats[i].name === catName){
                console.log(catName);
                cats[i].score++;
            }
        }
    }
};

var view = {
    init: function(){
        this.catList = document.getElementById('catList');
        this.activeArea = document.getElementById('activeArea');
        this.activeCat = this.activeArea.querySelector('#activeCat');
        this.catScore = this.activeArea.querySelector('#catScore');

        view.render()
    },

    render: function(){
        var catList = hub.getCats();
        for(var j = 0; j < catList.length; j++){
            var catName = document.createElement('li');
            catName.innerHTML = catList[j].name;
            catName.dataset.imgurl = catList[j].imgUrl;
            var currentCat = catList[j];
            catName.addEventListener('click', function(e){
                view.activeCat.src = e.target.dataset.imgurl;
                view.activeCat.dataset.cactive = e.target.innerHTML;
                view.catScore.innerHTML = currentCat.score;
            });
            console.log(catName);
            this.catList.appendChild(catName);

        }

        this.activeCat.addEventListener('click', function(e){
            var oldScore = parseInt(view.catScore.innerHTML);
            var newScore = oldScore + 1;
            view.catScore.innerHTML = newScore;
            console.log(newScore);
            hub.updateScore(view.activeCat.dataset.cactive);
        });
    }
};

var hub = {
    init: function(){
        model.init();
        view.init();
    },
    getCats: function(){
        return model.getCatList();
    },
    updateScore: function(catName){
        model.updateCatScore(catName);
    }
};

hub.init();