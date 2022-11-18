class DataService {
    static rawData = [{"name":"Horror Movies","values":["Halloween","Michael Myers","Laurie Strode","Jamie Lee Curtis","John Carpenter","The Texas Chain Saw Massacre","Leatherface","Gunnar Hansen","Sally Hardesty","Franklin Hardesty","Friday the 13th","Jason Voorhees","Pamela Voorhees","Camp Crystal Lake","A Nightmare on Elm Street","Freddie Krueger","Nancy Thompson","Wes Craven","Heather Langenkamp","Robert Englund","The Shining","Stanley Kubrick","Jack Nicholson","Jack Torrance","Shelley Duvall","Wendy Torrance","Danny Torrance","Dick Hallorann","The Exorcist","William Peter Blatty","Linda Blair","Regan MacnNeil","Father Karras","Scream","Kevin Williamson","Courtney Cox","Neve campbell","David Arquette","Ghostface","Sidney Prescott","Gale Weathers","Dewey Riley","Candyman","Clive Barker","Tony Todd","Hellraiser","Cenobites","Pinhead","It Follows","The Strangers","The Mist","The Fog","The Thing","The Ring","Saw","Trick 'r Treat","American Psycho","The Silence of the Lambs","Hannibal Lecter","Clarice Starling","Gremlins","Alien","Ridley Scott","Siourney Weaver","Ripley","Black Christmas","Nope","Midsommar","Hereditary","X","Pearl","Us","Get Out","A Quiet Place","It","Pennywise","Jeepers Creepers","Freaky","Urban Legend","Cabin in the Woods","Suspiria","Sleepaway Camp","Child's Play","Chucky","Unfriended","Happy Death Day","Ready or Not","You're Next","The Witch","As Above So Below","Final Girls","Krampus","The Visit","The Babadook","The Lighthouse","Lights Out","Sinister","The Conjuring","Insidious","Fresh","Green Room","Doctor Sleep","Saint Maud","The Love Witch","The Purge","Lake Mungo","The Blair Witch Project","Paranormal Activity","Pet Sematary","Christine","Silent Hill","Resident Evil","Dawn of the Dead","Night of the Living Dead","John Romero","The Lost Boys","Fear Street","Misery"]},{"name":"Lord of the Rings","values":["Frodo Baggins","Bilbo Baggins","Aragorn","Samwise Gamgee","Legolas","Elijah Wood","Viggo Mortensen","Sean Astin","Orlando Bloom","Gandalf","Ian McKellen","The Ring","Gollum","Andy Serkis","Riders of Rohan","Balrog","Mines of Moria","Elves","Dwarves","Hobbits","Men","Isildur","Boromir","Denethor","Saruman","Christopher Lee","Gimli","Arwen","Faramir","Witch-king of Angmar","Ringwraiths","Grima Wormtongue","Galadriel","Pippin","Merry","Ents","Treebeard","Sauron","Elrond","Theoden","Smaug","Benedict Cumberbatch"]},{"name":"Star Wars","values":["Luke Skywalker","Darth Vader","Leia Organa","Han Solo","Chewbacca","R2-D2","C-3P0","Lando Calrissian","Harrison Ford","Mark Hamill","James Earl Jones","George Lucas","Wookies","Boba Fett","Anakin Skywalker","Obi-Wan Kenobi","Ewan McGregor","Bail Organa","Tatooine","Hoth","Mustafar","Coruscant","Alderaan","Kashkyyyk","Naboo","Kamino","Bespin","Palpatine","Darth Sidious","Darth Maul","Count Dooku","Christopher Lee","Yoda","Younglings","Podracing","Grand Moff Tarkin","Jar Jar Binks","Vice-Admiral Holdo","Salacious B. Crumb","Wicket","Ewoks","Sebulba","Wedge Antilles","Finn","Rey","Poe Dameron","Jabba the Hutt","Mon Mothma","Smuggler","Bounty Hunter","The Mandalorian","Cassian Andor","Jyn Erso","Saw Gerrera","The Phantom Menace","Attack of the Clones","Revenge of the Sith","A New Hope","The Empire Strikes Back","Return of the Jedi","The Force Awakens","The Last Jedi","The Rise of Skywalker","Solo","Rogue One","Millenium Falcon"]}];

    static getData() {
        return this.rawData;
    }

    static urlize(text) {
        return text.replaceAll(' ', '-').toLowerCase();
    }

    static findFromParam(pathname) {
        console.log(pathname);
        for (let i = 0; i < this.rawData.length; i++) {
            let urlized = this.urlize(this.rawData[i].name);
            console.log(urlized);
            if (urlized === pathname) {
                return this.rawData[i];
            }
        }
        return null;
    }
}

export default DataService;