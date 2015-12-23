
origenDestino="$1"


case $origenDestino in
    BA-Chascomus|Chascomus-BA)
        phantomjs vtc.js $origenDestino
        phantomjs tren.js $origenDestino
        phantomjs ricchieri.js $origenDestino
        open "vtc-$origenDestino.png" "ricchieri-$origenDestino.png" "tren-$origenDestino.png"
        ;;
    *)
        ;;
esac
