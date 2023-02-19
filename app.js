const app = document.querySelector(".holeApp");
const canvas = document.getElementById("drawELemnt");
const notes = document.querySelectorAll(".note");
const addNote = document.getElementById("addNote");
const clearBtn = document.querySelector(".clear");

const noteBody = `			
      <div class="note">
				<textarea class="noteContent"></textarea>
			</div>`;

const creatNote = () => {
	app.insertAdjacentHTML("afterbegin", noteBody);
	const arrayofNote = Array.from(app.children);
	arrayofNote.forEach((note) => {
		note.addEventListener("mousedown", () => {
			const noteMove = (e) => {
				let x = `${e.clientX - 100}px`;
				let y = `${e.clientY - 100}px`;

				note.style.left = x;
				note.style.top = y;
			};
			const mouseUp = () => {
				note.removeEventListener("mousemove", noteMove);
			};
			note.addEventListener("mousemove", noteMove);
			note.addEventListener("mouseup", mouseUp);

			clearBtn.addEventListener("click", () => {
				note.remove();
			});
		});
	});
};

addNote.addEventListener("click", creatNote);

// //////////////////////////////////////////////////////////////////////////

//  free note by drawing
const freeNote = () => {
	const ctx = canvas.getContext("2d");
	canvas.width = app.clientWidth;
	canvas.height = app.clientHeight;

	let isPainting = false;
	let lineWidth = 2;
	let startX;
	let startY;

	canvas.addEventListener("mousedown", (e) => {
		isPainting = true;
		startX = e.clientX;
		startY = e.clientY;
	});

	const draw = (e) => {
		if (!isPainting) return;
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = "#fff";
		ctx.lineCap = "round";
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
	};

	const unDraw = () => {
		isPainting = false;
		ctx.stroke();
		ctx.beginPath();
	};

	canvas.addEventListener("mousemove", draw);
	canvas.addEventListener("mouseup", unDraw);

	clearBtn.addEventListener("click", () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	});
};
freeNote();
