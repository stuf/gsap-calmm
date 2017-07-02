    {U.sink(U.seq(waitFor(box, tl),
                  ap(tl => tl.from('#heart', 0.5, { opacity: 0, scale: 0.5 })
                             .add('start')),
                  ap(tl => tl.to('#heart', 0.75, { scale: 1.2, ease: Elastic.easeOut })
                             .to('#heart', 0.375, { scale: 1, ease: Elastic.easeOut, delay: 1 })
                             .play('start'))))}
