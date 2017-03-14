window.onload = function()
{
	var	c = document.getElementById("micanvas");
	c.style.opacity = 0;
function animate(objeto)
{
	var i = 0;
	var animacion = setInterval(
		function()
		{
			objeto.style.opacity = i;
			i+=0.01;
			if(i == 1)
			{
				clearTimeout(animacion);
			}
		}, 10);
}
	var i, posX, posY, sw, sh, canvasW, canvasH, ctx, personaje, velocidad, activador;
	i = 0;
	posX = 0;
	posY = 0;
	canvasW = c.width;
	canvasH = c.height;
	c.setAttribute("width", canvasW);
	c.setAttribute("height", canvasH);
	ctx = c.getContext("2d");
	personaje = new Image();
	personaje.src = "cabezaDavid/pj1.png";
	velocidad = 5;
	objetos();
	escenario();
	botones();
	window.onkeydown = function(tecla)
	{
		if(tecla.keyCode == 37 || tecla.keyCode == 38 || tecla.keyCode == 39 || tecla.keyCode == 40 || tecla.keyCode == 90)
		{
			escenario();
			if(tecla.keyCode == 39)
			{
				var i = 0;
				var bucle = setInterval(function()
				{
					if(posX > (canvasW-30))
					{
						posX--;
					}
					posX++;
					ctx.drawImage(personaje, posX, posY);
					ctx.clearRect(0, 0, posX, posY+30);
					escenario();
					i++;
					if(i == 30)
					{
						clearTimeout(bucle);
						i=0;
					}
				}, velocidad);
				ctx.drawImage(personaje, posX, posY);
				ctx.clearRect(0, 0, posX, posY+30);			
			}
			else if(tecla.keyCode == 40)
			{
				var i = 0;
				var bucle = setInterval(function()
				{
					if(posY > (canvasH-30))
					{
						posY--;
					}
					posY++;
					ctx.drawImage(personaje, posX, posY);
					ctx.clearRect(0, 0, posX+30, posY);
					escenario();
					i++;
					if(i == 30)
					{
						clearTimeout(bucle);
						i=0;
					}
				}, velocidad);
				ctx.drawImage(personaje, posX, posY);
				ctx.clearRect(0, 0, posX+30, posY);			
			}
			else if(tecla.keyCode == 37)
			{
				var i = 0;
				var bucle = setInterval(function()
				{
					if(posX <=0)
					{
						posX++;
					}
					posX--;
					ctx.drawImage(personaje, posX, posY);
					ctx.clearRect(posX+30, posY, canvasW, canvasH);
					escenario();
					i++;
					if(i == 30)
					{
						clearTimeout(bucle);
						i=0;
					}
				}, velocidad);
				ctx.drawImage(personaje, posX, posY);
				ctx.clearRect(posX+30, posY, canvasW, canvasH);			
			}
			else if(tecla.keyCode == 38)
			{
				var i = 0;
				var bucle = setInterval(function()
				{
					if(posY <=0)
					{
						posY++;
					}
					posY--;
					ctx.drawImage(personaje, posX, posY);
					ctx.clearRect(posX, posY+30, canvasW, canvasH);
					escenario();
					i++;
					if(i == 30)
					{
						clearTimeout(bucle);
						i=0;
					}
				}, velocidad);
				ctx.drawImage(personaje, posX, posY);
				ctx.clearRect(posX, posY+30, canvasW, canvasH);			
			}
			escenario();
			console.log("X:" + posX + "   Y:" + posY);
		}
		//   38
		//37 40 39
	}
	function objetos()
	{
		tienda = new Object();
		tienda.boton = document.getElementById("tienda");
		tienda.posX = canvasW-30;
		tienda.posY = canvasH-30;
		area = new Object();
		area.posX = 100;
		area.posY = 100;
		area.W = 100;
		area.H = 100;
	}
	function escenario()
	{
		//<TIENDA>
		ctx.fillStyle = "red";
		ctx.fillRect(tienda.posX, tienda.posY, 30, 30);
		if(posX >= tienda.posX && posY >= tienda.posY)
		{
			tienda.boton.style.opacity = 1;
		}
		else
		{
			tienda.boton.style.opacity = 0;
		}
		//</TIENDA>
		//<AREA>
		ctx.fillStyle = "green";
		ctx.fillRect(area.posX, area.posY, area.W, area.H);
		if(posX > area.posX-30 && posX < area.posX + area.W && posY > area.posY-30 && posY < area.posY + area.H)
		{
			ctx.fillStyle = "brown";
			ctx.fillRect(area.posX, area.posY, area.W, area.H);
		}
		//</AREA>
	}
	function botones()
	{
		var menu = document.getElementById("menuTienda");
		var empezar = document.getElementById("start");
		var doblevelocidad = document.getElementById("velocidadx2");
		var pistahielo = document.getElementById("pistahielo");
		empezar.onclick = function()
		{
			animate(c);
		}
		tienda.boton.onclick = function()
		{
			if(tienda.boton.style.opacity == 1)
			{
				var m = 422;
				var animacion = setInterval(function()
				{
					m-=2;
					menu.style.marginTop = -m;
					if(m == 0)
					{
						m = 0;
						clearInterval(animacion);
					}
				}, 5);
			}
		}
		var cruz = document.getElementById("salir");
		cruz.onclick = function()
		{
			var m = 0;
			var animacion = setInterval(function()
				{
					m+=2;
					menu.style.marginTop = -m;
					if(m == 422)
					{
						m = 0;
						clearInterval(animacion);
					}
				}, 5);
		}
		doblevelocidad.onclick = function()
		{
			velocidad = 1;
		}
		pistahielo.onclick = function()
		{
			velocidad = 100;
		}
	}
	var frames = setInterval(parpadeo, 100);
	function parpadeo()
	{
		if(i == 16)
		{
			i = 0;
		}
		personaje.src = "cabezaDavid/pj" + i + ".png";
		ctx.drawImage(personaje, posX, posY);
		i++;
	}
}