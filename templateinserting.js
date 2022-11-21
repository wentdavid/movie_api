var movie2 = {
  Title: "The Prestige",
  Description: "A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit and jealousy with dangerous and deadly consequences.",
  Genre: {
    Name: "Drama",
    Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods. To these ends, a primary element in a drama is the occurrence of conflict—emotional, social, or otherwise—and its resolution in the course of the storyline.",
  },
  Director: {
    Name: "Christopher Nolan",
    Bio: "Christopher Nolan[1] CBE (born 30 July 1970) is a British-American film director, producer, and screenwriter. His films have grossed more than US$5.7 billion worldwide and have garnered 11 Academy Awards from 36 nominations. Having received many awards and honours throughout his career for his works; in 2015, Time named him as one of the 100 most influential people in the world. In 2019, he was appointed Commander of the Order of the British Empire for his services to film.",
    Birth: "1970",
    Death: "-"
  },
  ImagePath: "https://i.jeded.com/i/the-prestige.14577.jpg",
  Featured: true
}

db.movies.insertOne(movie2)

var movie3 = {
    Title: "Interstellar",
    Description: "Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    Genre: {
      Name: "Science-Fiction",
      Description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition.",
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "Christopher Nolan[1] CBE (born 30 July 1970) is a British-American film director, producer, and screenwriter. His films have grossed more than US$5.7 billion worldwide and have garnered 11 Academy Awards from 36 nominations. Having received many awards and honours throughout his career for his works; in 2015, Time named him as one of the 100 most influential people in the world. In 2019, he was appointed Commander of the Order of the British Empire for his services to film.",
      Birth: "1970",
      Death: "-"
    },
    ImagePath: "https://buzz.tt/media/posters/670/posters_2_1500.jpg",
    Featured: true
  }

  db.movies.insertOne(movie3)

  var movie4 = {
    Title: "Tenet",
    Description: "Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
    Genre: {
      Name: "Science-Fiction",
      Description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition.",
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "Christopher Nolan[1] CBE (born 30 July 1970) is a British-American film director, producer, and screenwriter. His films have grossed more than US$5.7 billion worldwide and have garnered 11 Academy Awards from 36 nominations. Having received many awards and honours throughout his career for his works; in 2015, Time named him as one of the 100 most influential people in the world. In 2019, he was appointed Commander of the Order of the British Empire for his services to film.",
      Birth: "1970",
      Death: "-"
    },
    ImagePath: "https://media.senscritique.com/media/000019525188/source_big/Tenet.jpg",
    Featured: false
  }

  db.movies.insertOne(movie4)

  var movie5 = {
    Title: "Harry Potter and the Philosopher's Stone",
    Description: "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths—and about the villain who's to blame.",
    Genre: {
      Name: "Fantasy",
      Description: "Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and sometimes inspired by mythology and folklore. Its roots are in oral traditions, which then became fantasy literature and drama. From the twentieth century, it has expanded further into various media, including film, television, graphic novels, manga, animations and video games.",
    },
    Director: {
      Name: "Chris Columbus",
      Bio: "Chris Joseph Columbus[1] (born September 10, 1958) is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking. After writing screenplays for several teen comedies in the mid-1980s, he made his directorial debut with a teen adventure, Adventures in Babysitting (1987). Columbus gained recognition soon after with the highly successful Christmas comedy Home Alone (1990) and its sequel Home Alone 2: Lost in New York (1992).",
      Birth: "1958",
      Death: "-"
    },
    ImagePath: "https://image.tmdb.org/t/p/original/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    Featured: false
  }

  db.movies.insertOne(movie5)

  var movie6 = {
    Title: "Harry Potter and the Chamber of Secrets",
    Description: "Cars fly, trees fight back, and a mysterious house-elf comes to warn Harry Potter at the start of his second year at Hogwarts. Adventure and danger await when bloody writing on a wall announces: The Chamber Of Secrets Has Been Opened. To save Hogwarts will require all of Harry, Ron and Hermione’s magical abilities and courage.",
    Genre: {
      Name: "Fantasy",
      Description: "Fantasy is a genre of speculative fiction involving magical elements, typically set in a fictional universe and sometimes inspired by mythology and folklore. Its roots are in oral traditions, which then became fantasy literature and drama. From the twentieth century, it has expanded further into various media, including film, television, graphic novels, manga, animations and video games.",
    },
    Director: {
      Name: "Chris Columbus",
      Bio: "Chris Joseph Columbus[1] (born September 10, 1958) is an American filmmaker. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking. After writing screenplays for several teen comedies in the mid-1980s, he made his directorial debut with a teen adventure, Adventures in Babysitting (1987). Columbus gained recognition soon after with the highly successful Christmas comedy Home Alone (1990) and its sequel Home Alone 2: Lost in New York (1992).",
      Birth: "1958",
      Death: "-"
    },
    ImagePath: "https://image.tmdb.org/t/p/original/csOv5H7R2zdnKaYuTrGVWohmo8d.jpg",
    Featured: false
  }

  db.movies.insertOne(movie6)

  var movie7 = {
    Title: "The Great Gatsby",
    Description: "An adaptation of F. Scott Fitzgerald's Long Island-set novel, where Midwesterner Nick Carraway is lured into the lavish world of his neighbor, Jay Gatsby. Soon enough, however, Carraway will see through the cracks of Gatsby's nouveau riche existence, where obsession, madness, and tragedy await.",
    Genre: {
        Name: "Drama",
        Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods. To these ends, a primary element in a drama is the occurrence of conflict—emotional, social, or otherwise—and its resolution in the course of the storyline.",
      },
    Director: {
      Name: "Baz Luhrmann",
      Bio: "Mark Anthony Luhrmann (born 17 September 1962), known professionally as Baz Luhrmann, is an Australian film director, producer, writer and actor. With projects spanning film, television, opera, theatre, music and recording industries, he is regarded by some as a contemporary example of an auteur[2] for his style and deep involvement in the writing, directing, design, and musical components of all his work. He is the most commercially successful Australian director, with four of his films in the top ten highest worldwide grossing Australian films of all time.",
      Birth: "1962",
      Death: "-"
    },
    ImagePath: "https://amc-theatres-res.cloudinary.com/v1579119207/amc-cdn/production/2/movies/39400/39448/Poster/p_800x1200_AMC_GreatGatsbyThe2013_06302019.jpg",
    Featured: false
  }

  db.movies.insertOne(movie7)

  var movie8 = {
    Title: "Seven Pounds",
    Description: "An IRS agent with a fateful secret embarks on an extraordinary journey of redemption by forever changing the lives of seven strangers.",
    Genre: {
        Name: "Drama",
        Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods. To these ends, a primary element in a drama is the occurrence of conflict—emotional, social, or otherwise—and its resolution in the course of the storyline.",
      },
    Director: {
      Name: "Gabriele Muccino",
      Bio: "Gabriele Muccino (born 20 May 1967) is an Italian film director. He has worked his way from making short films only aired on Italian television to become a well-known and successful American filmmaker. He is the elder brother of actor Silvio Muccino, who often appears in his brother's films. Muccino has directed 12 films and is best known for his first American film The Pursuit of Happyness, starring Will Smith. Muccino has been nominated for and won several awards including the David di Donatello Award for Best Director in 2001 for his film The Last Kiss.",
      Birth: "1967",
      Death: "-"
    },
    ImagePath: "https://www.dvdsreleases.com/wp-content/uploads/movies/tt0814314.jpg",
    Featured: false
  }

  db.movies.insertOne(movie8)

  var movie9 = {
    Title: "Catch Me If You Can",
    Description: "A true story about Frank Abagnale Jr. who, before his 19th birthday, successfully conned millions of dollars worth of checks as a Pan Am pilot, doctor, and legal prosecutor. An FBI agent makes it his mission to put him behind bars. But Frank not only eludes capture, he revels in the pursuit.",
    Genre: {
        Name: "Drama",
        Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.[1] Drama of this kind is usually qualified with additional terms that specify its particular super-genre, macro-genre, or micro-genre,[2] such as soap opera, police crime drama, political drama, legal drama, historical drama, domestic drama, teen drama, and comedy-drama (dramedy). These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods. To these ends, a primary element in a drama is the occurrence of conflict—emotional, social, or otherwise—and its resolution in the course of the storyline.",
      },
    Director: {
      Name: "Steven Spielberg",
      Bio: "Steven Allan Spielberg KBE (born December 18, 1946) is an American film director, producer, and screenwriter.[1] A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director of all time. Spielberg is the recipient of various accolades, including three Academy Awards (including two Best Director wins), a Kennedy Center honor, a Cecil B. DeMille Award, and an AFI Life Achievement Award. In 2013, Time listed him as one of the 100 most influential people.",
      Birth: "1946",
      Death: "-"
    },
    ImagePath: "http://cafmp.com/wp-content/uploads/2013/01/Catch-Me-If-You-Can.jpg",
    Featured: false
  }

  db.movies.insertOne(movie9)

  var movie10 = {
    Title: "Minority Report",
    Description: "John Anderton is a top 'Precrime' cop in the late-21st century, when technology can predict crimes before they're committed. But Anderton becomes the quarry when another investigator targets him for a murder charge.",
    Genre: {
        Name: "Science-Fiction",
        Description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies. Science fiction films have often been used to focus on political or social issues, and to explore philosophical issues like the human condition.",
      },
    Director: ObjectId("636a6b9e8877f19c1d1d2c73"),
    ImagePath: "https://www.regarder-films.net/wp-content/uploads/2019/12/minority-report.jpg",
    Featured: false
  }

  db.movies.insertOne(movie10)









  var user1 = {
    Username: "went_david",
    Email: "davidwent@me.com",
    Password: "thisIsAPassword",
    Birthday: new Date("1995-09-09"),
    Favorites: [],
    
  }

  db.users.insertOne(user1)

  var user2 = {
    Username: "andreas.sohns",
    Email: "andreas.sohns@me.com",
    Password: "thisIsAPasswordfromAndreas",
    Birthday: new Date("1987-08-19"),
    Favorites: [],
    
  }

  db.users.insertOne(user2)

  var user3 = {
    Username: "m.krat",
    Email: "m.krat@me.com",
    Password: "thisIsAPasswordfromMaga",
    Birthday: new Date("1996-12-09"),
    Favorites: [],
    
  }

  db.users.insertOne(user3)

  var user4 = {
    Username: "askmedy",
    Email: "askmedy@me.com",
    Password: "thisIsAPasswordfromMehdi",
    Birthday: new Date("1987-06-09"),
    Favorites: [],
    
  }

  db.users.insertOne(user4)

  var user5 = {
    Username: "tarik",
    Email: "tarik@me.com",
    Password: "thisIsAPasswordfromTarik",
    Birthday: new Date("1987-06-09"),
    Favorites: [],
    
  }

  db.users.insertOne(user5)




  db.users.update(
    { Username: "went_david" },
    { $push: { Favorites: ObjectId("636a3f678877f19c1d1d2c6e") } }
  )


  db.users.update(
    { Username: "andreas.sohns" },
    { $push: { Favorites: ObjectId("636a3f678877f19c1d1d2c6e") } }
  )

  db.users.update(
    { Username: "m.krat" },
    { $push: { Favorites: ObjectId("636a3f678877f19c1d1d2c6b") } }
  )

  db.users.update(
    { Username: "askmedy" },
    { $push: { Favorites: ObjectId("636a3f678877f19c1d1d2c6c") } }
  )

  db.users.update(
    { Username: "tarik" },
    { $push: { Favorites: ObjectId("636a3f678877f19c1d1d2c6d") } }
  )




  db.movies.find({ "Genre.Name": "Fantasy" })


  db.movies.find( { Title: "The Prestige" } )


  db.movies.find( { "Genre.Name": "Fantasy", "Director.Name": "Chris Columbus"} )

  db.movies.update(
    { _id: ObjectId("636a3f678877f19c1d1d2c6e") },
    { $set: { Description: "Catch Me If You Can is a 2002 American biographical crime comedy-drama[3] film directed and produced by Steven Spielberg and starring Leonardo DiCaprio and Tom Hanks with Christopher Walken, Martin Sheen, Nathalie Baye, Amy Adams and James Brolin in supporting roles. The screenplay by Jeff Nathanson is based on the autobiography of Frank Abagnale, who claims that before his 19th birthday, he successfully performed cons worth millions of dollars by posing as a Pan American World Airways pilot, a Georgia doctor, and a Louisiana parish prosecutor. The truth of his story is questionable." } }
  )

  db.movies.update(
    { _id: ObjectId("636a3f678877f19c1d1d2c6e") },
    { $set: { "Director.Bio": "Steven Allan Spielberg KBE (born December 18, 1946) is an American film director, producer, and screenwriter.[1] A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director of all time. Spielberg is the recipient of various accolades, including three Academy Awards (including two Best Director wins), a Kennedy Center honor, a Cecil B. DeMille Award, and an AFI Life Achievement Award. In 2013, Time listed him as one of the 100 most influential people. Spielberg was born in Cincinnati, Ohio, and grew up in Phoenix, Arizona.[1] He moved to California and studied film in college. After directing several episodes for television including Night Gallery and Columbo, he directed the television film Duel (1971) which gained acclaim from critics and audiences. He made his directorial film debut with The Sugarland Express (1974), and became a household name with the 1975 summer blockbuster Jaws. He then directed box office successes Close Encounters of the Third Kind (1977), E.T. the Extra-Terrestrial (1982), and the Indiana Jones series. Spielberg explored drama in The Color Purple (1985) and Empire of the Sun (1987)." } }
  )

  var director1 = {
    Director: {
        Name: "Steven Spielberg",
        Bio: "Steven Allan Spielberg KBE (born December 18, 1946) is an American film director, producer, and screenwriter.[1] A major figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director of all time. Spielberg is the recipient of various accolades, including three Academy Awards (including two Best Director wins), a Kennedy Center honor, a Cecil B. DeMille Award, and an AFI Life Achievement Award. In 2013, Time listed him as one of the 100 most influential people. Spielberg was born in Cincinnati, Ohio, and grew up in Phoenix, Arizona.[1] He moved to California and studied film in college. After directing several episodes for television including Night Gallery and Columbo, he directed the television film Duel (1971) which gained acclaim from critics and audiences. He made his directorial film debut with The Sugarland Express (1974), and became a household name with the 1975 summer blockbuster Jaws. He then directed box office successes Close Encounters of the Third Kind (1977), E.T. the Extra-Terrestrial (1982), and the Indiana Jones series. Spielberg explored drama in The Color Purple (1985) and Empire of the Sun (1987).",
        Birth: "1946",
        Death: "-"
      },
    
  }

  db.directors.insertOne(director1)


  db.movies.update(
    { _id: ObjectId("636a3f678877f19c1d1d2c6e") },
    { $set: { Director: ObjectId("636a6b9e8877f19c1d1d2c73") } }
  )

  db.movies.find( {  _id: ObjectId("636a3f678877f19c1d1d2c6e") } )

  db.movies.find( {"Genre.Name": "Science-Fiction"} )

  db.movies.find( { "Director.Name": "Steven Spielberg"} )

  db.movies.find( { Title: "Minority Report"} )

  db.users.update(
    { Username: "went_david"},
    { $push: { Favorites: ObjectId("636a3f678877f19c1d1d2c6b") } }
  )

  db.users.deleteOne({ Username: "tarik"})


  mongoexport -d myFlixDB -c users -o myFlixDB_users.json