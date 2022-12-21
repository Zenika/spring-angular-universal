package com.mchoraine.springangularuniversal

import org.springframework.http.MediaType
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class AppController(val angularUniversalTemplating: AngularUniversalTemplating) {

    @GetMapping(path = ["/", ""], produces = [MediaType.TEXT_HTML_VALUE])
    fun getIndex(): String {
        return angularUniversalTemplating.render()
    }
}
