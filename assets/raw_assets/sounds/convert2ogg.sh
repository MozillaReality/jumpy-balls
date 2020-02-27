
for file in *.wav
do
	ffmpeg	-i $file -c:a libvorbis -qscale:a 8 ../../${file%.*}.ogg
done
