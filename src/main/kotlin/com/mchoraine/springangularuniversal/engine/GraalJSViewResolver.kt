package com.mchoraine.springangularuniversal.engine

import org.springframework.beans.factory.InitializingBean
import org.springframework.web.servlet.view.AbstractTemplateViewResolver
import org.springframework.web.servlet.view.AbstractUrlBasedView


class GraalJSViewResolver(graalJsEngine: GraalJsEngine) : AbstractTemplateViewResolver(),
    InitializingBean {
    private var characterEncoding = "UTF-8"
    private val graalJsEngine: GraalJsEngine

    init {
        this.graalJsEngine = graalJsEngine
        viewClass = requiredViewClass()
    }

    override fun afterPropertiesSet() {
//        val templateLoader: Loader<*> = graalJsEngine.getLoader()
//        templateLoader.setPrefix(prefix)
//        templateLoader.setSuffix(suffix)
    }

    fun setCharacterEncoding(characterEncoding: String) {
        this.characterEncoding = characterEncoding
    }

    @Throws(Exception::class)
    override fun buildView(viewName: String): AbstractUrlBasedView {
        val view: GraalJsView = super.buildView(viewName) as GraalJsView
        view.setTemplateName(viewName)
        view.setEngine(graalJsEngine)
        view.setCharacterEncoding(characterEncoding)
        return view
    }

    override fun requiredViewClass(): Class<*> {
        return GraalJsView::class.java
    }
}
