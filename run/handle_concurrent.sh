trap 'decrease' SIGTERM

decrease() {
    echo "Decreasing a concurrent app"
    curl -X PATCH $ENDPOINT/runner-scaling/reduce
    exit 0;
}

while true; do :; done