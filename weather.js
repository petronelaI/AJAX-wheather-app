		var vreme=[];
			function getVreme(){
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
					   vreme = JSON.parse(this.responseText);
					   console.log(vreme);
					   deseneazaTabel();
					}
				};
				xhttp.open("GET", `https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${document.getElementById("cauta_oras").value}`, true);
				xhttp.send();
			}

		function deseneazaTabel() {
			document.getElementById("vreme_icon").src=`http://openweathermap.org/img/w/${vreme.weather[0].icon}.png`;
			document.getElementById("des").innerHTML=vreme.weather[0].description;
			document.getElementById("umi").innerHTML=vreme.main.humidity;
			document.getElementById("pres").innerHTML=vreme.main.pressure;
			document.getElementById("temp").innerHTML=vreme.main.temp;
			document.getElementById("minZi").innerHTML=vreme.main.temp_min;
			document.getElementById("maxZi").innerHTML=vreme.main.temp_max;
			document.getElementById("coordHarta").src=`https://www.google.com/maps/embed/v1/place?key=AIzaSyDNCgmnHqiOuRvdBGN8NapDtH3wZb-Xikk
						&q=${vreme.coord.lat}, ${vreme.coord.lon}&zoom=12`;
		}

		var vremeUrm=[];
		function getVremeUrmZile(){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				   vremeUrm = JSON.parse(this.responseText);
				   console.log(vremeUrm);
				   deseneazaTabelDoi();
				}
			};
			xhttp.open("GET", `https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${document.getElementById("cauta_oras").value}`, true);
			xhttp.send();	
		}

		function deseneazaTabelDoi() {
			var str="";
			var str2="";
			var contor =0;
			var ziuaAnterioara=null;
			for(var i=0; i<vremeUrm.list.length; i++ ){
				if(ziuaAnterioara!==vremeUrm.list[i].dt_txt.substring(0,10)){
					if (contor!==0){
						str2=`<h3>Ziua: ${vremeUrm.list[i].dt_txt.substring(0,10)}</h3>`;
						document.getElementById("ziua"+contor).innerHTML=str2+str;
						str="";
					}

					contor++;
					ziuaAnterioara=vremeUrm.list[i].dt_txt.substring(0,10);
				}
				str += `
				    <img id= "iconVreme" src="http://openweathermap.org/img/w/${vremeUrm.list[i].weather[0].icon}.png" /><br /><br />
					Ora:<span id="oraVreme">${vremeUrm.list[i].dt_txt.substring(11,16)}</span><br/>
					Temperatura:<span id="tempVreme">${vremeUrm.list[i].main.temp}</span><br />
					Descrierea vremii:<span id="descVreme">${vremeUrm.list[i].weather[0].description}</span><br/>`;
			}
			document.getElementById("ziua"+contor).innerHTML=str2+str;
		}

		
		
		

