var lsAlgs =
[


   [
      "Heighway Dragon",
      2, 90, "", "FX", [{ rule: "X=X+YF+"}, {rule: "Y=-FX-Y"}]
   ],
      [
	  "Kevs Wispy Tree",
      2, 25, "", "FX", [{rule: "F=FF-[-F+F]+[+F-F]"}, {rule: "X=FF+[+F]+[-F]"}]
   ],
   [
	  
      "Koch Curve",
      2, 90, "", "-F", [{rule: "F=F+F-F-F+F"}]
   ],
   [
      "Kevs Tree",
      3, 22, "", "F", [{rule: "F=FF-[-F+F+F]+[+F-F-]"}]
   ],
   [
      "Kevs Pond Weed",
      2, 27, "", "F", [{rule:"F=FF[-F++F][+F--F]++F--F"}]
   ],
   [
      "Sierpinski triangle (curves)",
      3, 60, "", "A", [{rule:"A=B-A-B"}, {rule:"B=A+B+A"}]
   ],
   [
      "Sierpinski triangle (triangles)",
      3, 120, "", "F-G-G", [{rule:"F=F-G+F+G-F"}, {rule:"G=GG"}]
   ],
   [
      "Dragon Curve",
      3, 90, "F", "FX", [{rule:"X=X+YF"}, {rule:"Y=FX-Y"}]
   ],
   [
      "Fractal Plant",
      2, 25, "X", "X", [{rule:"X=F-[[X]+X]+F[+FX]-X"}, {rule:"F=FF"}]
   ],
   [
      "Koch Snowflake",
      2, 60, "X", "F++F++F", [{rule:"F=F-F++F-F"}, {rule:"X=FF"}]
   ],
   [
      "Pleasant Error",
      
	  2, 72, "", "F-F-F-F-F", [{rule:"F=F-F++F+F-F-F"}]
   ],
   [
      "Sierpinski's Carpet",
      2, 90, "", "F", [{rule:"F=F+F-F-F-G+F+F+F-F"}, {rule:"G=GGG"}]
   ],
   [
      "Space Filling Curve",
      3, 90, "XY", "X", [{rule:"X=-YF+XFX+FY-"}, {rule:"Y=+XF-YFY-FX+"}]
   ],
   [
      "Sierpinski Median Curve",
      
	  2, 45, "", "L--F--L--F", [{rule:"L=+R-F-R+"}, {rule:"R=-L+F+L-"}]
   ],
   [
      "Lace",
      2, 30, "", "W", [{rule:"W=+++X--F--ZFX+"}, {rule:"X=---W++F++YFW-"}, {rule:"Y=+ZFX--F--Z+++"}, {rule:"Z=-YFW++F++Y---"}]
   ]

];
