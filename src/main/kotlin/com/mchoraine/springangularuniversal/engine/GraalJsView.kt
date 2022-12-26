package com.mchoraine.springangularuniversal.engine

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.web.servlet.support.RequestContextUtils
import org.springframework.web.servlet.view.AbstractTemplateView
import java.io.Writer


class GraalJsView : AbstractTemplateView() {
    private var characterEncoding: String? = "UTF-8"
    private lateinit var graalJsEngine: GraalJsEngine
    private var templateName: String = "index"

    override fun renderMergedTemplateModel(
        model: MutableMap<String, Any>, request: HttpServletRequest,
        response: HttpServletResponse
    ) {
        val startNanoTime = System.nanoTime()
        this.setCharacterEncoding(response)
        addVariablesToModel(model, request, response)
        evaluateTemplate(model, request, response)
        logElapsedTime(startNanoTime, request)
    }

    private fun setCharacterEncoding(response: HttpServletResponse) {
        if (characterEncoding != null) {
            response.characterEncoding = characterEncoding
        }
    }

    private fun addVariablesToModel(
        model: MutableMap<String, Any>, request: HttpServletRequest,
        response: HttpServletResponse
    ) {
        model[REQUEST_VARIABLE_NAME] = request
        model[REQUEST_URL_VARIABLE_NAME] = request.requestURL.toString()
        model[RESPONSE_VARIABLE_NAME] = response
        request.getSession(false)?.let {
            model[SESSION_VARIABLE_NAME] = it
        }
    }

    private fun evaluateTemplate(
        model: Map<String, Any>, request: HttpServletRequest,
        response: HttpServletResponse
    ) {
        val locale = RequestContextUtils.getLocale(request)
        val writer: Writer = response.writer
        try {
            graalJsEngine.evaluate(templateName, writer, model, locale)
        } finally {
            writer.flush()
        }
    }

    private fun logElapsedTime(startNanoTime: Long, request: HttpServletRequest) {
        if (TIMER_LOGGER.isDebugEnabled()) {
            val locale = RequestContextUtils.getLocale(request)
            val endNanoTime = System.nanoTime()
            val elapsed = endNanoTime - startNanoTime
            val elapsedMs = elapsed / NANO_PER_SECOND
            TIMER_LOGGER
                .debug(
                    "GraalJS template \"{}\" with locale {} processed in {} nanoseconds (approx. {}ms)",
                    templateName, locale, elapsed, elapsedMs
                )
        }
    }

    fun setCharacterEncoding(characterEncoding: String) {
        this.characterEncoding = characterEncoding
    }

    fun setEngine(graalJsEngine: GraalJsEngine) {
        this.graalJsEngine = graalJsEngine
    }

    fun setTemplateName(name: String) {
        templateName = name
    }

    companion object {
        const val REQUEST_VARIABLE_NAME = "request"
        const val REQUEST_URL_VARIABLE_NAME = "url"
        const val RESPONSE_VARIABLE_NAME = "response"
        const val SESSION_VARIABLE_NAME = "session"
        private const val NANO_PER_SECOND = 1000000

        /**
         *
         *
         * TIMER logger. This logger will output the time required for executing each template processing
         * operation.
         *
         *
         *
         * The value of this constant is
         * <tt>io.pebbletemplates.servlet.spring.PebbleView.timer</tt>. This allows
         * you to set a specific configuration and/or appenders for timing info at your logging system
         * configuration.
         *
         */
        private val TIMER_LOGGER: Logger = LoggerFactory
            .getLogger(GraalJsView::class.java.name + ".timer")
    }
}
