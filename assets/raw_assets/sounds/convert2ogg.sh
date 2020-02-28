
for file in *.wav
do
	ffmpeg	-i $file -c:a libvorbis -qscale:a 8 ../../sounds/${file%.*}.ogg
done
